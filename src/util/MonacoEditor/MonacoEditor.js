import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as monaco from 'monaco-editor';
import {HiveSQLCompletionItemProvider, HiveSQLMonarchLanguage, SQLStandaloneThemeData, OdpsSQLMonarchLanguage, OdpsSQLCompletionItemProvider} from "./SQLMonarchLanguage";
import sqlFormatter from "../../utils/sqlFormatter/index";
import './MonacoEditor.less';

function noop() {
}

export class MonacoEditor extends Component {
  constructor(props) {
    super(props);
    this.containerElement = undefined;
    this.__current_value = props.value;
    this.resizeLayout = this.resizeLayout.bind(this);
  }

  componentDidMount() {
    this.initMonaco();
    window.addEventListener('resize', this.resizeLayout);
  }

  //窗改变大小时，重绘组件
  resizeLayout() {
    if (this.editor) {
      this.editor.layout();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== this.__current_value) {
      // Always refer to the latest value
      this.__current_value = this.props.value;
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.__prevent_trigger_change_event = true;
        this.editor.setValue(this.__current_value);
        this.__prevent_trigger_change_event = false;
      }
    }
    if (prevProps.language !== this.props.language) {
      monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
    }
    if (prevProps.theme !== this.props.theme) {
      monaco.editor.setTheme(this.props.theme);
    }
    if (this.editor) {
      this.editor.layout();
    }
  }

  componentWillUnmount() {
    this.destroyMonaco();
    window.removeEventListener('resize', this.resizeLayout);
  }

  editorWillMount() {
    const {editorWillMount} = this.props;
    editorWillMount(monaco);
  }

  editorDidMount(editor) {
    this.props.editorDidMount(editor, monaco);
    editor.onDidChangeModelContent((event) => {
      const value = editor.getValue();
      // Always refer to the latest value
      this.__current_value = value;
      // Only invoking when user input changed
      if (!this.__prevent_trigger_change_event) {
        if (event.changes[0].text === '.') {
          const word = editor.getModel().getWordUntilPosition({
            lineNumber: event.changes[0].range.startLineNumber,
            column: event.changes[0].range.endColumn,
          }).word;
        }
        this.props.onChange(value, event);
      }
    });
  }

  //注册hiveSql语言
  registerHiveSqlLanguage() {
      const languageId = "hiveSql";
      //注册theme
      monaco.editor.defineTheme(languageId, SQLStandaloneThemeData);
      // 注册新语语言
      monaco.languages.register({id: languageId});
      // hive注册关键字
      monaco.languages.setMonarchTokensProvider(languageId, HiveSQLMonarchLanguage);
      // hive注册提示补充
      monaco.languages.registerCompletionItemProvider(languageId, HiveSQLCompletionItemProvider);
      // 格式化
      monaco.languages.registerDocumentRangeFormattingEditProvider(languageId, {
        provideDocumentRangeFormattingEdits: function (model, range, options, token) {
          return [
            {
              range: {
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn,
              },
              text: sqlFormatter.format(model.getValueInRange(range, monaco.editor.EndOfLinePreference.LF), {
                indent: "    ",
              }),
            }
          ];
        }
      });
      //配置
      monaco.languages.setLanguageConfiguration(languageId, {
        comments: {
          lineComment: '--'
        },
        surroundingPairs:[{"open":"{","close":"}"},{"open":"(","close":")"}],
        autoClosingPairs:[{"open":"{","close":"}"},{"open":"(","close":")"}],
        brackets:[["{","}"],["(",")"]]
      });
  }

  //注册odpsSql语言
  registerOdpsSqlLanguage() {
    const languageId = "odpsSql";
    //注册theme
    monaco.editor.defineTheme(languageId, SQLStandaloneThemeData);
    // 注册新语语言
    monaco.languages.register({id: languageId});
    monaco.languages.setMonarchTokensProvider(languageId, OdpsSQLMonarchLanguage);
    // odps注册提示补充
    monaco.languages.registerCompletionItemProvider(languageId, OdpsSQLCompletionItemProvider);
    // 格式化
    monaco.languages.registerDocumentRangeFormattingEditProvider(languageId, {
      provideDocumentRangeFormattingEdits: function (model, range, options, token) {
        return [
          {
            range: {
              startLineNumber: range.startLineNumber,
              startColumn: range.startColumn,
              endLineNumber: range.endLineNumber,
              endColumn: range.endColumn,
            },
            text: sqlFormatter.format(model.getValueInRange(range, monaco.editor.EndOfLinePreference.LF), {
              indent: "    ",
            }),
          }
        ];
      }
    });
    //配置
    monaco.languages.setLanguageConfiguration(languageId, {
      comments: {
        lineComment: '--'
      },
      surroundingPairs:[{"open":"{","close":"}"},{"open":"(","close":")"},{"open":"[","close":"]"}],
      autoClosingPairs:[{"open":"{","close":"}"},{"open":"(","close":")"},{"open":"[","close":"]"}],
      brackets:[["{","}"],["(",")"],["[","]"]]
    });
    //
    // monaco.languages.registerSelectionRangeProvider(languageId, {
    //   provideSelectionRanges: function (model, positions, token) {
    //
    //   }
    // });
  }

  initMonaco() {
    const value = this.props.value !== null ? this.props.value : this.props.defaultValue;
    const {language, theme, options} = this.props;
    if (this.containerElement) {
      // Before initializing monaco editor
      this.editorWillMount();
      //注册自定义语言
      const languages = monaco.languages.getLanguages();
      let isHiveSqlRegister = false;
      let isOdpsSqlRegister = false;
      languages.map((item) => {
        if (item.id === "hiveSql") {
          isHiveSqlRegister = true;
        }
        if (item.id === "odpsSql") {
          isOdpsSqlRegister = true;
        }
      });
      if (!isHiveSqlRegister) {
        this.registerHiveSqlLanguage();
      }
      if (!isOdpsSqlRegister) {
        this.registerOdpsSqlLanguage()
      }
      this.editor = monaco.editor.create(this.containerElement, {
        value,
        language,
        theme,
        ...options,
      });
      // After initializing monaco editor
      this.editorDidMount(this.editor);
    }
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose();
    }
  }

  assignRef = (component) => {
    this.containerElement = component;
  };

  render() {
    const {width, height} = this.props;
    const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`;
    const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`;
    const style = {
      width: fixedWidth,
      height: fixedHeight
    };
    return <div ref={this.assignRef} style={style} className="react-monaco-editor-container"/>;
  }
}

MonacoEditor.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.string,
  options: PropTypes.object,
  editorDidMount: PropTypes.func,
  editorWillMount: PropTypes.func,
  onChange: PropTypes.func
};

MonacoEditor.defaultProps = {
  width: '100%',
  height: '100%',
  value: null,
  defaultValue: '',
  language: 'hql',
  theme: null,
  options: {},
  editorDidMount: noop,
  editorWillMount: noop,
  onChange: noop
};
