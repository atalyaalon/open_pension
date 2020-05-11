import re
import numpy as np

ISIN_PATTERN = re.compile('^[A-Z]{2}[A-Z0-9]{9}\\d$')
OPEN_FIGI_LARGE_BULK = 100
OPEN_FIGI_SMALL_BULK = 5

NULL_VALUES_LIST = [0, '0', np.nan, None]

# Asset Types
CASH = 'מזומנים'
GOVERNMENTAL_BONDS = 'תעודות התחייבות ממשלתיות'
COMMERCIAL_BONDS = 'תעודות חוב מסחריות'
COMPANY_BONDS = 'אג"ח קונצרני'
STOCKS = 'מניות'
MUTUAL_FUNDS = 'קרנות נאמנות'
ETF = 'תעודות סל'  # Exchange-traded fund
WARRANTS = 'כתבי אופציה'
OPTIONS = 'אופציות'
FUTURES = 'חוזים עתידיים'
STRUCTURED_PRODUCT = 'מוצרים מובנים'

# Non Tradeable asset types
GOVERNMENTAL_BONDS_NT = 'לא סחיר - תעודות התחייבות ממשלתיות'
COMMERCIAL_BONDS_NT = 'לא סחיר - תעודות חוב מסחריות'
COMPANY_BONDS_NT = 'לא סחיר - אג"ח קונצרני'
STOCKS_NT = 'לא סחיר - מניות'
MUTUAL_FUNDS_NT = 'לא סחיר - קרנות השקעה'
WARRANTS_NT = 'לא סחיר - כתבי אופציה'
OPTIONS_NT = 'לא סחיר - אופציות'
FUTURES_CONTRACT_NT = 'לא סחיר - חוזים עתידיים'
STRUCTURED_PRODUCT_NT = 'לא סחיר - מוצרים מובנים'

# Other Asset Types
LOANS = 'הלוואות'
SECURITY_DEP_OVER_THREE_MONTHS = 'פקדונות מעל 3 חודשים'
REAL_ESTATE = 'זכויות מקרקעין'
INVESTMENT_IN_HELD_COMPANIES = 'השקעה בחברות מוחזקות'
OTHER_INVESTMENTS = 'השקעות אחרות'
BALANCE_INVESTMENT_COMMITMENT = 'יתרת התחייבות להשקעה'
COORDINATED_COST_COMPANY_BONDS = "עלות מתואמת אג\"ח קונצרני סחיר"
COORDINATED_COST_COMPANY_BONDS_NT = "עלות מתואמת אג\"ח קונצרני ל.סחיר"
COORDINATED_COST_BORROWING_CREDIT = "עלות מתואמת מסגרות אשראי ללווים"


ALL_INSTRUMENT_TYPES = [
    CASH,
    GOVERNMENTAL_BONDS,
    COMMERCIAL_BONDS,
    COMPANY_BONDS,
    STOCKS,
    ETF,
    MUTUAL_FUNDS,
    WARRANTS,
    OPTIONS,
    FUTURES,
    STRUCTURED_PRODUCT,
    STOCKS_NT,
    GOVERNMENTAL_BONDS_NT,
    COMMERCIAL_BONDS_NT,
    COMPANY_BONDS_NT,
    MUTUAL_FUNDS_NT,
    WARRANTS_NT,
    OPTIONS_NT,
    FUTURES_CONTRACT_NT,
    STRUCTURED_PRODUCT_NT,
    LOANS,
    SECURITY_DEP_OVER_THREE_MONTHS,
    REAL_ESTATE,
    INVESTMENT_IN_HELD_COMPANIES,
    OTHER_INVESTMENTS,
    BALANCE_INVESTMENT_COMMITMENT,
    COORDINATED_COST_COMPANY_BONDS,
    COORDINATED_COST_BORROWING_CREDIT
]


DF_COLUMNS = [
    'Currency',
    'Duration',
    'Fair value',
    'Industry',
    'Information provider',
    'Instrument name',
    'Instrument number',
    'Investment',
    'Issuer number',
    'Market name',
    'Nominal value',
    'Price',
    'Purchase date',
    'Rate',
    'Rate of fund holding',
    'Rate of instrument type',
    'Rate of register',
    'Rating',
    'Rating agencies',
    'Underlying asset',
    'coupon',
    'dividend',
    'Yield to maturity',
    'file_name',
    'index',
    'israel',
    'line_in_file',
    'total commitment'
]