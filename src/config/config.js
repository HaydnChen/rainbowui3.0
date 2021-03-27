'use strict';
module.exports = {
    DEFAULT_DATETIME_FORMATER: 'YYYY/MM/DD',
    DEFAULT_DATETIME_SUBMIT_FORMATER: 'YYYY-MM-DD[T]HH:mm:ss',
    DEFAULT_CREATION_HOUR: '00',
    DEFAULT_CREATION_MINUTE: '00',
    DEFAULT_CREATION_SECOND: '00',
    DEFAULT_DATE_MANUAL_INPUT: false,
    DEFAULT_NUMBER_FORMAT: '###,###,###,###.##',
    DEFAULT_CURRENCY_UNIT: '$',
    DEFAULT_CURRENCY_FORMAT: '###,###,###.##',
    DEFAULT_CODETABLE_KEYVALUE: { KEY: 'id', VALUE: 'text' },
    DEFAULT_API_CODETABLE_KEYVALUE: { KEY: 'Id', VALUE: 'Description' },
    DEFAULT_BOOLEAN_VALUE: { 'TRUE': 'Y', 'FALSE': 'N' },
    DEFAULT_VALIDATOR_CONTAINER: 'popover',// tooltip / popover
    DEFAULT_STYLE_CLASS: 'default',
    DEFAULT_ECHARTS_THEME: 'default',
    DEFAULT_LOCALSTORAGE_I18NKEY: 'system_i18nKey',
    DEFAULT_SYSTEM_I18N: 'zh_CN',
    DEFAULT_SYSTEM_THEME: 'default',
    DEFAULT_DATATABLE_PAGESIZE: 10,
    DEFAULT_DATATABLE_DROPDOWNLIST: [5, 10, 20, 30, 40, 50],
    DOES_USE_I18N: false,
    DEFAULT_I18N_CONFIGURATION_GROUP: 'PA',
    DEFAULT_DATATABLE_PAGEABLE_EN: true,
    DEFAULT_MESSAGE_POSITION: {
        DEFAULT_POSITION: 'toast-top-right',
        SUCCESS_POSITION: 'toast-top-right',
        INFO_POSITION: 'toast-top-right',
        WARNING_POSITION: 'toast-top-right',
        ERROR_POSITION: 'toast-top-right'
    },
    DEFAULT_INPUT_LAYOUT: 'vertical',
    DEFAULT_DATATABLE_IS_INDEX: 'true',
    DEFAULT_LOGOUT_IS_WORKING: 'false',
    DEFAULT_LOGOUT_TIME_MINUTES: 30,
    DEFAULT_COUNTDOWN_IS_WORKING: 'false',
    DOSE_HELPTEXT_IS_HTML: 'false',
    SMART_PANELGRID_COLUMN: 4,
    ES_INDEX: 'current.applog.ccic.ebao',
    // Single load code table API is  embeded in UISearch Component - dd/public/codetable/v1/byCodeTableName
    // Batch load code table API is configured in page component - /dd/public/codetable/v1/codeTableVoList/byNameList
    // CODETABLE: {
    //     CONTEXT: 'integration/context/getContextTypes/Mapping',
    //     GETCODETABLEBYNAME: 'dd/public/codetable/v1/data/list/byName'
    // },
    USER: {
        USER_INFO: 'urp/public/users/v1/current/info',//
        GET_USER_LANG: 'urp/public/users/v1/getlang',//
        SET_USER_LANG: 'urp/public/users/v1/changelang',
        GET_LANGUAGE_LIST: 'i18n/language/v1/list',
        AUTH: 'urp/public/system/v1/user/auth',
        LOGIN: 'v1/json/tickets',
        GET_MENU: 'urp/public/authorities/v1/loadAllMenu'
    },
    SEARCH: {
        // URL: 'system/ap00sc/channel/fuzzy/list/byChannelName',
        // QUOTATION: 'pa/cloud/v1/query?keyword=',
        Keyword: 'proposal/v1/query?keyword=',
        Condition: 'proposal/v1/query'
        // Query Policy List API is encapsulated in Rainbow API /policy/foundation/searchPolicy?keyword=?  - /proposal/v1/query?keyword=?
    },
    // SEARCHID: {
    //     URL: 'urp/public/users/v1/queryByCondition'
    // },
    I18N: {
        LOAD_UILABELS: 'i18n/translation/v1/ui/load',
        LOAD_UILABELS_CONFIG_GROUPS: 'i18n/translation/v1/ui/load/groups'
    },
    PRODUCT: {
        PRODUCT_LIST: 'product/prd/v1/query/getAllProductList'
        //Get Product Schema API is embed in Rainbow SDK ProductStore.getProductElement - product/element/runtime/v1/getElementTreeByProductId
        //COVERAGE_Name: 'product/element/runtime/v1'
    },
    PROPOSAL: {
        APPLICATION: 'proposal/v1/application',
        ISSUANCE: 'proposal/v1/issuance',
        LOAD: 'proposal/v1/load',
        INSTALLMENT: 'proposal/v1/installment'
        // CALCULATE: 'proposal/v1/calculate'
    },
    QUOTATION: {
        QUOTATION: 'quotation/v1/quotation'
    },
    ENDO: {
        NONPREMIUMINFOCHANGE: 'endo/vela/endorsement/v1/nonPremiumInfoChange',
        QUERYENDORSEMENTHISTORY: 'endo/vela/endorsement/v1/queryEndorsementHistory',
        LOAD: 'endo/vela/endorsement/v1/load',
        FLATCANCELENDORSEMENT: 'endo/vela/cancellationEndorsement/v1/flatCancelEndorsement'
    },
    BCP: {
        SUMMARY: '/rest/arap/gi/summary',
        SUBMIT: '/rest/arap/gi/submitarap',
        COLLECTION: '/rest/cash/gi/createCollection',
        PAYMENT: '/rest/cash/gi/createPayments',
        CASHRESULTS: '/rest/cash/gi/cashResults'
    }
};