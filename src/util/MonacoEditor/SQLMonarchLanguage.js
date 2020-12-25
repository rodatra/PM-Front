import * as monaco from 'monaco-editor';

//主题
export const SQLStandaloneThemeData = {
  base: 'vs',
  inherit: false,
  rules: [
    //运算符
    {token: 'operator', foreground: '778899'},
    //关键字
    {token: 'keyword', foreground: '0000FF'},
    //内置变量
    {token: 'builtinVariable', foreground: '008B00'},
    //数据类型
    {token: 'dataType', foreground: '0000FF'},
    //数字
    {token: 'number', foreground: '319C76'},
    //字符串
    {token: 'string', foreground: 'FC3637'},
    //注释
    {token: 'comment', foreground: '207F1A'},
    //分隔符
    {token: 'delimiter', foreground: '474747'},
    //函数
    {token: 'function', foreground: 'FC39FF'},
    {token: 'predefined', foreground: 'FC39FF'},
  ]
};


//hiveSql 关键字
export const HiveSQLMonarchLanguage = {
  ignoreCase: true,
  keywords: [
    //Reserved Keywords
    'ALL', 'ALTER', 'AND', 'ARRAY', 'AS', 'AUTHORIZATION', 'BETWEEN AND', 'BIGINT', 'BINARY', 'BOOLEAN', 'BOTH', 'BY', 'CASE', 'CAST', 'CHAR', 'COLUMN', 'CONF', 'CREATE', 'CROSS', 'CUBE'
    , 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'CURSOR', 'DATABASE', 'DATE', 'DECIMAL', 'DELETE', 'DESCRIBE', 'DISTINCT', 'DOUBLE', 'DROP', 'ELSE', 'END', 'EXCHANGE', 'EXISTS'
    , 'EXTENDED', 'EXTERNAL', 'FALSE', 'FETCH', 'FLOAT', 'FOLLOWING', 'FOR', 'FROM', 'FULL', 'FUNCTION', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'IF', 'IMPORT', 'IN', 'INNER', 'INSERT'
    , 'INT', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LATERAL', 'LEFT', 'LESS', 'LIKE', 'LOCAL', 'MACRO', 'MAP', 'MORE', 'NONE', 'NOT', 'NULL', 'OF', 'ON', 'OR', 'ORDER', 'OUT', 'OUTER'
    , 'OVER', 'PARTIALSCAN', 'PARTITION', 'PERCENT', 'PRECEDING', 'PRESERVE', 'PROCEDURE', 'RANGE', 'READS', 'REDUCE', 'RLIKE', 'REVOKE', 'RIGHT', 'ROLLUP', 'ROW', 'ROWS', 'SELECT', 'SET', 'SMALLINT'
    , 'TABLE', 'TABLESAMPLE', 'THEN', 'TIMESTAMP', 'TO', 'TRANSFORM', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNBOUNDED', 'UNION', 'UNIQUEJOIN', 'UPDATE', 'USER', 'USING', 'UTC_TMESTAMP', 'VALUES'
    , 'VARCHAR', 'WHEN', 'WHERE', 'WINDOW', 'WITH', 'COMMIT', 'ONLY', 'REGEXP', 'RLIKE', 'ROLLBACK', 'START', 'CACHE', 'CONSTRAINT', 'FOREIGN', 'PRIMARY', 'REFERENCES', 'DAYOFWEEK', 'EXTRACT'
    , 'FLOOR', 'INTEGER', 'PRECISION', 'VIEWS', 'TIME', 'NUMERIC', 'BETWEEN AND', 'IS NULL', 'IS NOT NULL',
    //Non-reserved Keywords
    'ADD', 'ADMIN', 'AFTER', 'ANALYZE', 'ARCHIVE', 'ASC', 'BEFORE', 'BUCKET', 'BUCKETS', 'CASCADE', 'CHANGE', 'CLUSTER', 'CLUSTERED', 'CLUSTERSTATUS', 'COLLECTION', 'COLUMNS', 'COMMENT', 'COMPACT'
    , 'COMPACTIONS', 'COMPUTE', 'CONCATENATE', 'CONTINUE', 'DATA', 'DATABASES', 'DATETIME', 'DAY', 'DBPROPERTIES', 'DEFERRED', 'DEFINED', 'DELIMITED', 'DEPENDENCY', 'DESC', 'DIRECTORIES', 'DIRECTORY'
    , 'DISABLE', 'DISTRIBUTE', 'ELEM_TYPE', 'ENABLE', 'ESCAPED', 'EXCLUSIVE', 'EXPLAIN', 'EXPORT', 'FIELDS', 'FILE', 'FILEFORMAT', 'FIRST', 'FORMAT', 'FORMATTED', 'FUNCTIONS', 'HOLD_DDLTIME', 'HOUR'
    , 'IDXPROPERTIES', 'IGNORE', 'INDEX', 'INDEXES', 'INPATH', 'INPUTDRIVER', 'INPUTFORMAT', 'ITEMS', 'JAR', 'KEYS', 'KEY_TYPE', 'LIMIT', 'LINES', 'LOAD', 'LOCATION', 'LOCK', 'LOCKS', 'LOGICAL', 'LONG'
    , 'MAPJOIN', 'MATERIALIZED', 'METADATA', 'MINUS', 'MINUTE', 'MONTH', 'MSCK', 'NOSCAN', 'NO_DROP', 'OFFLINE', 'OPTION', 'OUTPUTDRIVER', 'OUTPUTFORMAT', 'OVERWRITE', 'OWNER', 'PARTITIONED', 'PARTITIONS'
    , 'PLUS', 'PRETTY', 'PRINCIPALS', 'PROTECTION', 'PURGE', 'READ', 'READONLY', 'REBUILD', 'RECORDREADER', 'RECORDWRITER', 'RELOAD', 'RENAME', 'REPAIR', 'REPLACE', 'REPLICATION', 'RESTRICT'
    , 'REWRITE', 'ROLE', 'ROLES', 'SCHEMA', 'SCHEMAS', 'SECOND', 'SEMI', 'SERDE', 'SERDEPROPERTIES', 'SERVER', 'SETS', 'SHARED', 'SHOW', 'SHOW_DATABASE', 'SKEWED', 'SORT', 'SORTED', 'SSL', 'STATISTICS'
    , 'STORED', 'STREAMTABLE', 'STRING', 'STRUCT', 'TABLES', 'TBLPROPERTIES', 'TEMPORARY', 'TERMINATED', 'TINYINT', 'TOUCH', 'TRANSACTIONS', 'UNARCHIVE', 'UNDO', 'UNIONTYPE', 'UNLOCK', 'UNSET', 'UNSIGNED'
    , 'URI', 'USE', 'UTC', 'UTCTIMESTAMP', 'VALUE_TYPE', 'VIEW', 'WHILE', 'YEAR', 'AUTOCOMMIT', 'ISOLATION', 'LEVEL', 'OFFSET', 'SNAPSHOT', 'TRANSACTION', 'WORK', 'WRITE,ABORT', 'KEY', 'LAST', 'NORELY'
    , 'NOVALIDATE', 'NULLS', 'RELY', 'VALIDATE,DETAIL', 'DOW', 'EXPRESSION', 'OPERATOR', 'QUARTER', 'SUMMARY', 'VECTORIZATION', 'WEEK', 'YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINUTES', 'SECONDS'
    , 'TIMESTAMPTZ', 'ZONE'
  ],
  dataTypes: [
    //Numeric Types
    'tinyint', 'smallint', 'int', 'integer', 'bigint', 'float', 'double', 'decimal',
    //Date/Time Types
    'timestamp', 'date', 'interval',
    //String Types
    'string', 'varchar', 'char',
    //Misc Types
    'boolean', 'binary',
    //Complex Types
    'array', 'map', 'struct',
  ],
  operators: [
    //Relational Operators
    '=', '==', '<=>', '<>', '!=', '<', '<=', '>', '>=',
    //Arithmetic Operators
    '+', '-', '*', '/',  '%', '&', '|', '^', '~','$', '!',
  ],
  builtinFunctions: [
    //Mathematical Functions
    'round', 'bround', 'floor', 'ceil', 'ceiling', 'rand', 'exp', 'ln', 'log10', 'log2', 'log', 'pow', 'power', 'sqrt', 'bin', 'hex', 'unhex', 'conv',
    'abs', 'pmod', 'sin', 'asin', 'cos', 'acos', 'tan', 'atan', 'degrees', 'radians', 'positive', 'negative', 'sign', 'e', 'pi', 'factorial', 'cbrt',
    'shiftleft', 'shiftright', 'shiftrightunsigned', 'greatest', 'least', 'width_bucket',
    //Collection Functions
    'size', 'map_keys', 'map_values', 'array_contains', 'sort_array',
    //Type Conversion Functions
    'binary', 'cast',
    //Date Functions
    'from_unixtime', 'unix_timestamp', 'to_date', 'year', 'quarter', 'month', 'day', 'dayofmonth', 'hour', 'minute', 'second', 'weekofyear', 'datediff',
    'date_add', 'date_sub', 'from_utc_timestamp', 'current_date', 'current_timestamp', 'add_months', 'last_day', 'next_day', 'trunc', 'months_between',
    'date_format',
    //Conditional Functions
    'nvl', 'if', 'coalesce', 'isnull', 'isnotnull',
    //String Functions
    'ascii', 'base64', 'concat', 'context_ngrams', 'concat_ws', 'decode', 'encode', 'find_in_set', 'format_number', 'get_json_object', 'in_file', 'instr',
    'length', 'locate', 'lower', 'lcase', 'lpad', 'ltrim', 'ngrams', 'parse_url', 'printf', 'regexp_extract', 'regexp_replace', 'repeat', 'reverse', 'rpad',
    'rtrim', 'sentences', 'space', 'split', 'str_to_map', 'substr', 'substring', 'substring_index', 'translate', 'trim', 'unbase64', 'upper', 'ucase', 'initcap',
    'levenshtein', 'soundex',
    //Data Masking Functions
    //Misc. Functions
    'md5', 'crc32', 'sha', 'sha1', 'sha2', 'aes_encrypt', 'aes_decrypt', 'version',
    //udaf
    'avg', 'count', 'collect_set', 'max', 'min', 'sum', 'variance', 'var_pop', 'var_samp', 'stddev_pop', 'stddev_samp', 'covar_pop', 'covar_samp', 'corr', 'percentile',
    //UDTF
    'explode', 'posexplode', 'stack', 'json_tuple', 'parse_url_tuple', 'inline'
  ],
  userDefinedFunctions: [
    'default.bi_date_diff', 'default.bi_date_get', 'default.cdn_log_url_analysis', 'default.cloudacc_split', 'default.collect_order','default.concat_user_room_reco',
    'default.concat_ws_uniq','default.dy_date_to_timestamp','default.dy_number_check','default.dy_round','default.format_number','default.get_cloudacc_json_str'
    ,'default.get_idcvpn_ipinfo','default.get_recommend_value','default.ip2address','default.is_inset','default.is_numbers','default.json','default.json2string',
    'default.jsonobjparser','default.loadfromjson','default.max_pt','default.md5','default.url_decode','default.video_id_parser',
  ],
  builtinVariables: [
  ],
  tokenizer: {
    root: [
      {include: '@comments'},
      {include: '@whitespace'},
      {include: '@numbers'},
      {include: '@strings'},
      {include: '@complexIdentifiers'},
      [/[;,.]/, 'delimiter'],
      [/default\.\w+/, 'predefined'],
      [/[\w]+/, {
            cases: {
              '@operators': 'operator',
              '@builtinVariables': 'builtinVariable',
              '@builtinFunctions': 'function',
              '@userDefinedFunctions': 'function',
              '@dataTypes': 'dataType',
              '@keywords': 'keyword',
            }
      }],
    ],
    whitespace: [
      [/\s+/, 'white']
    ],
    comments: [
      [/--+.*/, 'comment'],
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, 'number'],
      /*[/[$][+-]*\d*(\.\d*)?/, 'number'],*/
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
    ],
    strings: [
      [/'/, {token: 'string', next: '@string'}],
      [/"/, {token: 'string.double', next: '@stringDouble'}]
    ],
    string: [
      [/[^']+/, 'string'],
      [/''/, 'string'],
      [/'/, {token: 'string', next: '@pop'}],
    ],
    stringDouble: [
      [/[^"]+/, 'string.double'],
      [/""/, 'string.double'],
      [/"/, {token: 'string.double', next: '@pop'}]
    ],
    complexIdentifiers: [
      [/`/, {token: 'identifier.quote', next: '@quotedIdentifier'}]
    ],
    quotedIdentifier: [
      [/[^`]+/, 'identifier'],
      [/``/, 'identifier'],
      [/`/, {token: 'identifier.quote', next: '@pop'}]
    ],
  }
};


//hiveSql提示
export const HiveSQLCompletionItemProvider = {
  provideCompletionItems: (document, position, token, context) => {
    let completionItemProvider = [
      {
        label: 'iotp',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'INSERT OVERWRITE TABLE ${1:table_name} PARTITION (dt="\$\{${2:bizdate}\}")'
        }
      },
      {
        label: 'ctp',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'CREATE TABLE IF NOT EXISTS ${1:table_name}\n'
            + '(\n'
            + '\t${2:fields}\n'
            + ')\n'
            + 'COMMENT \'${3:注释}\'\n'
            + 'PARTITIONED BY (dt STRING COMMENT \'分区字段，yyyyMMdd\')\n'
            + 'STORED AS PARQUET\n'
            + ';'
        }
      },
      {
        label: 'sfw',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'SELECT\n' +
            '\t${1:filed}\n' +
            'FROM\n' +
            '\t${2:table_name}\n' +
            'WHERE\n' +
            '\t${3:condition}\n' +
            ';'
        }
      },
      {
        label: 'sfwg',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'SELECT\n' +
            '\t${1:filed}\n' +
            'FROM\n' +
            '\t${2:table_name}\n' +
            'WHERE\n' +
            '\t${3:condition}\n' +
            'GROUP BY\n' +
            '\t${4:group_field}\n' +
            ';'
        }
      },
      {
        label: 'sfwgol',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'SELECT\n' +
            '\t${1:filed}\n' +
            'FROM\n' +
            '\t${2:table_name}\n' +
            'WHERE\n' +
            '\t${3:condition}\n' +
            'GROUP BY\n' +
            '\t${4:group_field}\n' +
            'ORDER BY\n' +
            '\t${5:order_field}\n' +
            'LIMIT ${6:limit_number}\n' +
            ';'
        }
      },
      {
        label: 'lo',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'LEFT OUTER JOIN\n' +
            '\t${1:join_table}\n' +
            'ON\n' +
            '\t${2:join_condition}\n'
        }
      },
      {
        label: 'io',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'INNER JOIN\n' +
            '\t${1:join_table}\n' +
            'ON\n' +
            '\t${2:join_condition}\n'
        }
      }
    ];
    HiveSQLMonarchLanguage.keywords.map((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {value: item},
      })
    });
    HiveSQLMonarchLanguage.builtinFunctions.map((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: {
          value: item + '('
        }
      })
    });
    HiveSQLMonarchLanguage.userDefinedFunctions.map((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: {
          value: item + '('
        }
      });
    });
    //已经出现过的word加入到提示中
    const inputWord = document.getWordUntilPosition(position).word;
    const findMatches = document.findMatches(inputWord, true, false, true, null, true);
    const suggestions = new Set();
    findMatches.map((item) => {
      const rang = item.range;
      const postion = new monaco.Position(rang.startLineNumber, rang.startColumn);
      const word = document.getWordAtPosition(postion);
      suggestions.add(word.word);
    });
    suggestions.forEach((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Text,
      });
    });
    return completionItemProvider;
  },
};


//odpsSql 关键字
export const OdpsSQLMonarchLanguage = {
  ignoreCase: true,
  keywords: [
    //Reserved Keywords
    'ALL', 'ALTER', 'AND', 'ARRAY', 'AS', 'AUTHORIZATION', 'BETWEEN AND', 'BIGINT', 'BINARY', 'BOOLEAN', 'BOTH', 'BY', 'CASE', 'CAST', 'CHAR', 'COLUMN', 'CONF', 'CREATE', 'CROSS', 'CUBE'
    , 'CURRENT', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'CURSOR', 'DATABASE', 'DATE', 'DECIMAL', 'DELETE', 'DESCRIBE', 'DISTINCT', 'DOUBLE', 'DROP', 'ELSE', 'END', 'EXCHANGE', 'EXISTS'
    , 'EXTENDED', 'EXTERNAL', 'FALSE', 'FETCH', 'FLOAT', 'FOLLOWING', 'FOR', 'FROM', 'FULL', 'FUNCTION', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'IF', 'IMPORT', 'IN', 'INNER', 'INSERT'
    , 'INT', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LATERAL', 'LEFT', 'LESS', 'LIKE', 'LOCAL', 'MACRO', 'MAP', 'MORE', 'NONE', 'NOT', 'NULL', 'OF', 'ON', 'OR', 'ORDER', 'OUT', 'OUTER'
    , 'OVER', 'PARTIALSCAN', 'PARTITION', 'PERCENT', 'PRECEDING', 'PRESERVE', 'PROCEDURE', 'RANGE', 'READS', 'REDUCE', 'RLIKE', 'REVOKE', 'RIGHT', 'ROLLUP', 'ROW', 'ROWS', 'SELECT', 'SET', 'SMALLINT'
    , 'TABLE', 'TABLESAMPLE', 'THEN', 'TIMESTAMP', 'TO', 'TRANSFORM', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNBOUNDED', 'UNION', 'UNIQUEJOIN', 'UPDATE', 'USER', 'USING', 'UTC_TMESTAMP', 'VALUES'
    , 'VARCHAR', 'WHEN', 'WHERE', 'WINDOW', 'WITH', 'COMMIT', 'ONLY', 'REGEXP', 'RLIKE', 'ROLLBACK', 'START', 'CACHE', 'CONSTRAINT', 'FOREIGN', 'PRIMARY', 'REFERENCES', 'DAYOFWEEK', 'EXTRACT'
    , 'FLOOR', 'INTEGER', 'PRECISION', 'VIEWS', 'TIME', 'NUMERIC', 'BETWEEN AND', 'IS NULL', 'IS NOT NULL', 'COST SQL',
    //Non-reserved Keywords
    'ADD', 'ADMIN', 'AFTER', 'ANALYZE', 'ARCHIVE', 'ASC', 'BEFORE', 'BUCKET', 'BUCKETS', 'CASCADE', 'CHANGE', 'CLUSTER', 'CLUSTERED', 'CLUSTERSTATUS', 'COLLECTION', 'COLUMNS', 'COMMENT', 'COMPACT'
    , 'COMPACTIONS', 'COMPUTE', 'CONCATENATE', 'CONTINUE', 'DATA', 'DATABASES', 'DATETIME', 'DAY', 'DBPROPERTIES', 'DEFERRED', 'DEFINED', 'DELIMITED', 'DEPENDENCY', 'DESC', 'DIRECTORIES', 'DIRECTORY'
    , 'DISABLE', 'DISTRIBUTE', 'ELEM_TYPE', 'ENABLE', 'ESCAPED', 'EXCLUSIVE', 'EXPLAIN', 'EXPORT', 'FIELDS', 'FILE', 'FILEFORMAT', 'FIRST', 'FORMAT', 'FORMATTED', 'FUNCTIONS', 'HOLD_DDLTIME', 'HOUR'
    , 'IDXPROPERTIES', 'IGNORE', 'INDEX', 'INDEXES', 'INPATH', 'INPUTDRIVER', 'INPUTFORMAT', 'ITEMS', 'JAR', 'KEYS', 'KEY_TYPE', 'LIMIT', 'LINES', 'LOAD', 'LOCATION', 'LOCK', 'LOCKS', 'LOGICAL', 'LONG'
    , 'MAPJOIN', 'MATERIALIZED', 'METADATA', 'MINUS', 'MINUTE', 'MONTH', 'MSCK', 'NOSCAN', 'NO_DROP', 'OFFLINE', 'OPTION', 'OUTPUTDRIVER', 'OUTPUTFORMAT', 'OVERWRITE', 'OWNER', 'PARTITIONED', 'PARTITIONS'
    , 'PLUS', 'PRETTY', 'PRINCIPALS', 'PROTECTION', 'PURGE', 'READ', 'READONLY', 'REBUILD', 'RECORDREADER', 'RECORDWRITER', 'RELOAD', 'RENAME', 'REPAIR', 'REPLACE', 'REPLICATION', 'RESTRICT'
    , 'REWRITE', 'ROLE', 'ROLES', 'SCHEMA', 'SCHEMAS', 'SECOND', 'SEMI', 'SERDE', 'SERDEPROPERTIES', 'SERVER', 'SETS', 'SHARED', 'SHOW', 'SHOW_DATABASE', 'SKEWED', 'SORT', 'SORTED', 'SSL', 'STATISTICS'
    , 'STORED', 'STREAMTABLE', 'STRING', 'STRUCT', 'TABLES', 'TBLPROPERTIES', 'TEMPORARY', 'TERMINATED', 'TINYINT', 'TOUCH', 'TRANSACTIONS', 'UNARCHIVE', 'UNDO', 'UNIONTYPE', 'UNLOCK', 'UNSET', 'UNSIGNED'
    , 'URI', 'USE', 'UTC', 'UTCTIMESTAMP', 'VALUE_TYPE', 'VIEW', 'WHILE', 'YEAR', 'AUTOCOMMIT', 'ISOLATION', 'LEVEL', 'OFFSET', 'SNAPSHOT', 'TRANSACTION', 'WORK', 'WRITE,ABORT', 'KEY', 'LAST', 'NORELY'
    , 'NOVALIDATE', 'NULLS', 'RELY', 'VALIDATE,DETAIL', 'DOW', 'EXPRESSION', 'OPERATOR', 'QUARTER', 'SUMMARY', 'VECTORIZATION', 'WEEK', 'YEARS', 'MONTHS', 'WEEKS', 'DAYS', 'HOURS', 'MINUTES', 'SECONDS'
    , 'TIMESTAMPTZ', 'ZONE'
  ],
  dataTypes: [
    //Numeric Types
    'tinyint', 'smallint', 'int', 'bigint', 'float', 'double', 'decimal',
    //Date/Time Types
    'timestamp', 'DATETIME',
    //String Types
    'string', 'varchar',
    //Misc Types
    'boolean', 'binary',
    //Complex Types
    'array', 'map', 'struct',
  ],
  operators: [
    //Relational Operators
    '=', '==', '<=>', '<>', '!=', '<', '<=', '>', '>=',
    //Arithmetic Operators
    '+', '-', '*', '/',  '%', '&', '|', '^', '~','$', '!',
  ],
  builtinFunctions: [
    //聚合函数
    'avg', 'count', 'max', 'median', 'min', 'stddev', 'stddev_samp', 'sum',
    //窗口函数
    'dense_rank', 'lag', 'lead', 'rank', 'row_number', 'cluster_sample', 'percent_rank',
    //日期函数
    'dateadd', 'datediff', 'datepart', 'datetrunc', 'from_unixtime', 'getdate', 'isdate', 'lastday', 'to_date', 'to_char', 'unix_timestamp', 'weekday', 'weekofyear',
    //数学函数
    'abs', 'acos', 'asin', 'atan', 'conv', 'cos', 'cosh', 'cot', 'exp', 'rand', 'round', 'floor', 'sin', 'sinh',
    'sqrt', 'tan', 'tanh', 'trunc', 'ln', 'log', 'pow', 'ceil',
    //字符串处理函数
    'chr', 'concat', 'instr', 'keyvalue', 'length', 'lengthb', 'md5', 'regexp_instr', 'regexp_replace', 'regexp_substr',
    'split_part', 'to_char', 'substr', 'tolower', 'toupper', 'trim', 'wm_concat',
    'get_json_object', 'is_encoding', 'parse_url', 'regexp_count', 'regexp_extract', 'url_decode', 'url_encode',
    //其他
    'cast', 'coalesce', 'decode', 'greatest', 'ordinal', 'option_bit', 'least', 'trans_cols', 'trans_array', 'unique_id', 'uuid'
  ],
  userDefinedFunctions: [
    'adx_decode', 'adx_encode', 'bi_date_diff', 'bi_date_get', 'collect_set_bigint', 'dy_date_to_timestamp', 'format_number', 'get_recommend_value',
    'ip2address', 'ip2long', 'is_numbers', 'json', 'loadfromjson', 'percentile', 'percentile_approx', 'percentile_approx_array', 'percentile_array',
    'remove_all_emojis', 'to_percent', 'trans_array', 'trans_cols', 'url_decode', 'video_id_parser', 'workday'
  ],
  builtinVariables: [

  ],
  tokenizer: {
    root: [
      {include: '@comments'},
      {include: '@whitespace'},
      {include: '@numbers'},
      {include: '@strings'},
      {include: '@complexIdentifiers'},
      [/[;,.]/, 'delimiter'],
      [/[\w]+/, {
        cases: {
          '@operators': 'operator',
          '@builtinVariables': 'builtinVariable',
          '@builtinFunctions': 'function',
          '@userDefinedFunctions': 'function',
          '@dataTypes': 'dataType',
          '@keywords': 'keyword',
        }
      }],
    ],
    whitespace: [
      [/\s+/, 'white']
    ],
    comments: [
      [/--+.*/, 'comment'],
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, 'number'],
      [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
    ],
    strings: [
      [/'/, {token: 'string', next: '@string'}],
      [/"/, {token: 'string.double', next: '@stringDouble'}]
    ],
    string: [
      [/[^']+/, 'string'],
      [/''/, 'string'],
      [/'/, {token: 'string', next: '@pop'}],
    ],
    stringDouble: [
      [/[^"]+/, 'string.double'],
      [/""/, 'string.double'],
      [/"/, {token: 'string.double', next: '@pop'}]
    ],
    complexIdentifiers: [
      [/`/, {token: 'identifier.quote', next: '@quotedIdentifier'}]
    ],
    quotedIdentifier: [
      [/[^`]+/, 'identifier'],
      [/``/, 'identifier'],
      [/`/, {token: 'identifier.quote', next: '@pop'}]
    ],
  }
};



//odpsSql提示
export const OdpsSQLCompletionItemProvider = {
  provideCompletionItems: (document, position, token, context) => {
    let completionItemProvider = [
      {
        label: 'iotp',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'INSERT OVERWRITE TABLE ${1:table_name} PARTITION (dt="\$\{${2:bizdate}\}")'
        }
      },
      {
        label: 'ctp',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'CREATE TABLE IF NOT EXISTS ${1:table_name}\n'
            + '(\n'
            + '\t${2:fields}\n'
            + ')\n'
            + 'COMMENT \'${3:注释}\'\n'
            + 'PARTITIONED BY (dt STRING COMMENT \'分区字段，yyyyMMdd\')\n'
            + ';'
        }
      },
      {
        label: 'sfw',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'SELECT\n' +
            '\t${1:filed}\n' +
            'FROM\n' +
            '\t${2:table_name}\n' +
            'WHERE\n' +
            '\t${3:condition}\n' +
            ';'
        }
      },
      {
        label: 'sfwg',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'SELECT\n' +
            '\t${1:filed}\n' +
            'FROM\n' +
            '\t${2:table_name}\n' +
            'WHERE\n' +
            '\t${3:condition}\n' +
            'GROUP BY\n' +
            '\t${4:group_field}\n' +
            ';'
        }
      },
      {
        label: 'sfwgol',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'SELECT\n' +
            '\t${1:filed}\n' +
            'FROM\n' +
            '\t${2:table_name}\n' +
            'WHERE\n' +
            '\t${3:condition}\n' +
            'GROUP BY\n' +
            '\t${4:group_field}\n' +
            'ORDER BY\n' +
            '\t${5:order_field}\n' +
            'LIMIT ${6:limit_number}\n' +
            ';'
        }
      },
      {
        label: 'lo',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'LEFT OUTER JOIN\n' +
            '\t${1:join_table}\n' +
            'ON\n' +
            '\t${2:join_condition}\n'
        }
      },
      {
        label: 'io',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {
          value: 'INNER JOIN\n' +
            '\t${1:join_table}\n' +
            'ON\n' +
            '\t${2:join_condition}\n'
        }
      }
    ];
    OdpsSQLMonarchLanguage.keywords.map((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: {value: item},
      })
    });
    OdpsSQLMonarchLanguage.builtinFunctions.map((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: {
          value: item + '('
        }
      })
    });
    OdpsSQLMonarchLanguage.userDefinedFunctions.map((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: {
          value: item + '('
        }
      });
    });
    //已经出现过的word加入到提示中
    const inputWord = document.getWordUntilPosition(position).word;
    const findMatches = document.findMatches(inputWord, true, false, true, null, true);
    const suggestions = new Set();
    findMatches.map((item) => {
      const rang = item.range;
      const postion = new monaco.Position(rang.startLineNumber, rang.startColumn);
      const word = document.getWordAtPosition(postion);
      suggestions.add(word.word);
    });
    suggestions.forEach((item) => {
      completionItemProvider.push({
        label: item,
        kind: monaco.languages.CompletionItemKind.Text,
      });
    });
    return completionItemProvider;
  },
};
