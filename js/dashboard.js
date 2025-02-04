const { useState, useEffect } = React;
const { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} = Recharts;

// Define all our utility constants
const currencyColors = {
    USA: '#0066cc',    // Deep Blue
    EMU: '#00cc66',    // Green
    GBR: '#8B008B',    // Dark Purple
    JPN: '#cc6600',    // Orange
    CHN: '#FF0000',    // Bright Red
    CHE: '#6600cc'     // Purple
};

const dashPatterns = ["", "5 5", "10 5", "5 1 5", "15 5", "20 5"];
  
const countryConfig = [
{ suffix: 'USA', name: 'USA', currency: 'USA' },
{ suffix: 'EMU', name: 'EMU', currency: 'EMU' },
{ suffix: 'GBR', name: 'GBR', currency: 'GBR' },
{ suffix: 'JPN', name: 'JPN', currency: 'JPN' },
{ suffix: 'CHN', name: 'CHN', currency: 'CHN' },
{ suffix: 'CHE', name: 'CHE', currency: 'CHE' }
];

const createConfig = (prefix) => 
countryConfig.map(country => ({
    dataKey: `${prefix}_${country.suffix}`,
    name: country.name,
    currency: country.currency
}));

const FeatureChart = ({ title, data, dataKeys, yAxisLabel }) => {
return (
    <Card className="w-full mb-6">
    <CardHeader>
        <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
                dataKey="year"
                type="number"
                domain={['auto', 'auto']}
                tickCount={10}
            />
            <YAxis 
                label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            {dataKeys.map((key, index) => (
                <Line
                key={key.dataKey}
                type="monotone"
                dataKey={key.dataKey}
                name={key.name}
                stroke={currencyColors[key.currency]}
                strokeDasharray={dashPatterns[index]}
                strokeWidth={2}
                dot={false}
                connectNulls
                />
            ))}
            </LineChart>
        </ResponsiveContainer>
        </div>
    </CardContent>
    </Card>
);
};

// Panel Components
const InternationalCurrencyPanel = ({ data }) => {
const reserveConfig = [
    { dataKey: 'reserve_share_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'reserve_share_EUR', name: 'EUR', currency: 'EMU' },
    { dataKey: 'reserve_share_GBP', name: 'GBP', currency: 'GBR' },
    { dataKey: 'reserve_share_JPY', name: 'JPY', currency: 'JPN' },
    { dataKey: 'reserve_share_CNY', name: 'CNY', currency: 'CHN' },
    { dataKey: 'reserve_share_CHF', name: 'CHF', currency: 'CHE' }
];

const anchorConfig = [
    { dataKey: 'anchor_share_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'anchor_share_EUR', name: 'EUR', currency: 'EMU' },
    { dataKey: 'anchor_share_GBP', name: 'GBP', currency: 'GBR' },
    { dataKey: 'anchor_share_JPY', name: 'JPY', currency: 'JPN' }
];

const fxConfig = [
    { dataKey: 'fx_turnover_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'fx_turnover_EUR', name: 'EUR', currency: 'EMU' },
    { dataKey: 'fx_turnover_GBP', name: 'GBP', currency: 'GBR' },
    { dataKey: 'fx_turnover_JPY', name: 'JPY', currency: 'JPN' },
    { dataKey: 'fx_turnover_CNY', name: 'CNY', currency: 'CHN' },
    { dataKey: 'fx_turnover_CHF', name: 'CHF', currency: 'CHE' }
];

const swiftConfig = [
    { dataKey: 'swift_share_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'swift_share_EUR', name: 'EUR', currency: 'EMU' },
    { dataKey: 'swift_share_GBP', name: 'GBP', currency: 'GBR' },
    { dataKey: 'swift_share_JPY', name: 'JPY', currency: 'JPN' },
    { dataKey: 'swift_share_CNY', name: 'CNY', currency: 'CHN' },
    { dataKey: 'swift_share_CHF', name: 'CHF', currency: 'CHE' }
];

const debtDenomConfig = [
    { dataKey: 'debt_denom_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'debt_denom_EUR', name: 'EUR', currency: 'EMU' },
    { dataKey: 'debt_denom_GBP', name: 'GBP', currency: 'GBR' },
    { dataKey: 'debt_denom_JPY', name: 'JPY', currency: 'JPN' },
    { dataKey: 'debt_denom_CHF', name: 'CHF', currency: 'CHE' }
];

const bondConfig = [
    { dataKey: 'bond_share_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'bond_share_EUR', name: 'EUR', currency: 'EMU' }
];

const debtShareConfig = [
    { dataKey: 'debt_share_USD', name: 'USD', currency: 'USA' },
    { dataKey: 'debt_share_EUR', name: 'EUR', currency: 'EMU' },
    { dataKey: 'debt_share_JPY', name: 'JPY', currency: 'JPN' }
];

return (
    <TabsContent value="currency_measures">
    <FeatureChart 
        title="Official Foreign Exchange Reserves" 
        data={data} 
        dataKeys={reserveConfig}
        yAxisLabel="Share (%)" 
    />
    <FeatureChart 
        title="Currency Anchor Share" 
        data={data} 
        dataKeys={anchorConfig}
        yAxisLabel="Share (%)" 
    />
    <FeatureChart 
        title="FX Market Turnover" 
        data={data} 
        dataKeys={fxConfig}
        yAxisLabel="Share (%)" 
    />
    <FeatureChart 
        title="SWIFT Payment Share" 
        data={data} 
        dataKeys={swiftConfig}
        yAxisLabel="Share (%)" 
    />
    <FeatureChart 
        title="Currency Composition of External Debt" 
        data={data} 
        dataKeys={debtDenomConfig}
        yAxisLabel="Share (%)" 
    />
    <FeatureChart 
        title="Currency Denomination of International Bond Issuance" 
        data={data} 
        dataKeys={bondConfig}
        yAxisLabel="Share (%)" 
    />
    <FeatureChart 
        title="Currency Composition of Outstanding International Debt Securities" 
        data={data} 
        dataKeys={debtShareConfig}
        yAxisLabel="Share (%)" 
    />
    </TabsContent>
);
};

const EconomicPanel = ({ data }) => (
<TabsContent value="economic">
    <FeatureChart 
    title="GDP" 
    data={data} 
    dataKeys={createConfig('GDP')} 
    yAxisLabel="Share of World GDP (%)" 
    />
    <FeatureChart 
    title="Foreign Trade Volume" 
    data={data} 
    dataKeys={createConfig('Trade')} 
    yAxisLabel="Share of World Trade (%)" 
    />
</TabsContent>
);

const FinancialPanel = ({ data }) => (
<TabsContent value="financial">
    <FeatureChart 
    title="Stock Market Capitalization" 
    data={data} 
    dataKeys={createConfig('market_cap')} 
    yAxisLabel="Share of GDP (%)" 
    />
    <FeatureChart 
    title="Government Bond Outstanding" 
    data={data} 
    dataKeys={createConfig('govdebt')} 
    yAxisLabel="Share of GDP (%)" 
    />
    <FeatureChart 
    title="Private Credit" 
    data={data} 
    dataKeys={createConfig('PrivateCredit')} 
    yAxisLabel="Share of GDP (%)" 
    />
</TabsContent>
);

const CurrencyPanel = ({ data }) => (
<TabsContent value="currency">
    <FeatureChart 
    title="CPI Inflation Rate" 
    data={data} 
    dataKeys={createConfig('inflation')} 
    yAxisLabel="(%)" 
    />
    <FeatureChart 
    title="Exchange Rate Volatility" 
    data={data} 
    dataKeys={createConfig('EXVOL')} 
    yAxisLabel="Volatility" 
    />
    <FeatureChart 
    title="Real GDP Growth Rate" 
    data={data} 
    dataKeys={createConfig('gdpgrowth')} 
    yAxisLabel="(%)" 
    />
    <FeatureChart 
    title="Real Interest Rate" 
    data={data} 
    dataKeys={createConfig('r')} 
    yAxisLabel="(%)" 
    />
</TabsContent>
);

const OpennessPanel = ({ data }) => (
<TabsContent value="openness">
    <FeatureChart 
    title="Financial Openness (Chinn-Ito Index)" 
    data={data} 
    dataKeys={createConfig('kaopen')} 
    yAxisLabel="Index" 
    />
</TabsContent>
);

const InstitutionalPanel = ({ data }) => (
<TabsContent value="institutional">
    <FeatureChart 
    title="Economic Freedom Index" 
    data={data} 
    dataKeys={createConfig('freedom')} 
    yAxisLabel="Index" 
    />
</TabsContent>
);

const GeopoliticalPanel = ({ data }) => (
<TabsContent value="geopolitical">
    <FeatureChart 
    title="Military Expenditure" 
    data={data} 
    dataKeys={createConfig('military')} 
    yAxisLabel="Share of World Total (%)" 
    />
    <FeatureChart 
    title="Armed Forces Personnel" 
    data={data} 
    dataKeys={createConfig('ArmedPerson')} 
    yAxisLabel="Share of World Total (%)" 
    />
    <FeatureChart 
    title="FDI Assets Abroad" 
    data={data} 
    dataKeys={createConfig('FDI')} 
    yAxisLabel="Share of GDP (%)" 
    />
    <FeatureChart 
    title="Patent Applications" 
    data={data} 
    dataKeys={createConfig('patents')} 
    yAxisLabel="Share of World Total (%)" 
    />
    <FeatureChart 
    title="Sanctions (as Sender)" 
    data={data} 
    dataKeys={createConfig('sanction_sender')} 
    yAxisLabel="Number of Sanctions" 
    />
    <FeatureChart 
    title="Sanctions (as Target)" 
    data={data} 
    dataKeys={createConfig('sanction_target')} 
    yAxisLabel="Number of Sanctions" 
    />
</TabsContent>
);

// Main Dashboard Component
function FeatureDashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://currency-intl-data.s3.us-east-1.amazonaws.com/combined_currency_data_20250201.xlsx');
                const arrayBuffer = await response.arrayBuffer();
                const data = new Uint8Array(arrayBuffer);
                const workbook = XLSX.read(data, {
                    cellDates: true,
                    cellNF: true
                });
                
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                
                const processedData = jsonData.map(row => ({
    year: row.__EMPTY,
    // International Currency Measures
    reserve_share_USD: parseFloat(row.reserve_share_USD) || null,
    reserve_share_EUR: parseFloat(row.reserve_share_EUR) || null,
    reserve_share_GBP: parseFloat(row.reserve_share_GBP) || null,
    reserve_share_JPY: parseFloat(row.reserve_share_JPY) || null,
    reserve_share_CNY: parseFloat(row.reserve_share_CNY) || null,
    reserve_share_CHF: parseFloat(row.reserve_share_CHF) || null,
    
    anchor_share_USD: parseFloat(row.anchor_share_USD) || null,
    anchor_share_EUR: parseFloat(row.anchor_share_EUR) || null,
    anchor_share_GBP: parseFloat(row.anchor_share_GBP) || null,
    anchor_share_JPY: parseFloat(row.anchor_share_JPY) || null,
    
    fx_turnover_USD: parseFloat(row.fx_turnover_USD) || null,
    fx_turnover_EUR: parseFloat(row.fx_turnover_EUR) || null,
    fx_turnover_GBP: parseFloat(row.fx_turnover_GBP) || null,
    fx_turnover_JPY: parseFloat(row.fx_turnover_JPY) || null,
    fx_turnover_CNY: parseFloat(row.fx_turnover_CNY) || null,
    fx_turnover_CHF: parseFloat(row.fx_turnover_CHF) || null,
    
    swift_share_USD: parseFloat(row.swift_share_USD) || null,
    swift_share_EUR: parseFloat(row.swift_share_EUR) || null,
    swift_share_GBP: parseFloat(row.swift_share_GBP) || null,
    swift_share_JPY: parseFloat(row.swift_share_JPY) || null,
    swift_share_CNY: parseFloat(row.swift_share_CNY) || null,
    swift_share_CHF: parseFloat(row.swift_share_CHF) || null,
    
    debt_denom_USD: parseFloat(row.debt_denom_USD) || null,
    debt_denom_EUR: parseFloat(row.debt_denom_EUR) || null,
    debt_denom_GBP: parseFloat(row.debt_denom_GBP) || null,
    debt_denom_JPY: parseFloat(row.debt_denom_JPY) || null,
    debt_denom_CHF: parseFloat(row.debt_denom_CHF) || null,
    
    bond_share_USD: parseFloat(row.bond_share_USD) || null,
    bond_share_EUR: parseFloat(row.bond_share_EUR) || null,

    debt_share_USD: parseFloat(row.debt_share_USD) || null,
    debt_share_EUR: parseFloat(row.debt_share_EUR) || null,
    debt_share_JPY: parseFloat(row.debt_share_JPY) || null,

    // Economic Size
    GDP_USA: parseFloat(row.GDP_USA) || null,
    GDP_EMU: parseFloat(row.GDP_EMU) || null,
    GDP_GBR: parseFloat(row.GDP_GBR) || null,
    GDP_JPN: parseFloat(row.GDP_JPN) || null,
    GDP_CHN: parseFloat(row.GDP_CHN) || null,
    GDP_CHE: parseFloat(row.GDP_CHE) || null,
    
    Trade_USA: parseFloat(row.Trade_USA) || null,
    Trade_EMU: parseFloat(row.Trade_EMU) || null,
    Trade_GBR: parseFloat(row.Trade_GBR) || null,
    Trade_JPN: parseFloat(row.Trade_JPN) || null,
    Trade_CHN: parseFloat(row.Trade_CHN) || null,
    Trade_CHE: parseFloat(row.Trade_CHE) || null,
    
    // Financial Market Development
    market_cap_USA: parseFloat(row.market_cap_USA) || null,
    market_cap_EMU: parseFloat(row.market_cap_EMU) || null,
    market_cap_GBR: parseFloat(row.market_cap_GBR) || null,
    market_cap_JPN: parseFloat(row.market_cap_JPN) || null,
    market_cap_CHN: parseFloat(row.market_cap_CHN) || null,
    market_cap_CHE: parseFloat(row.market_cap_CHE) || null,
    
    govdebt_USA: parseFloat(row.govdebt_USA) || null,
    govdebt_EMU: parseFloat(row.govdebt_EMU) || null,
    govdebt_GBR: parseFloat(row.govdebt_GBR) || null,
    govdebt_JPN: parseFloat(row.govdebt_JPN) || null,
    govdebt_CHN: parseFloat(row.govdebt_CHN) || null,
    govdebt_CHE: parseFloat(row.govdebt_CHE) || null,
    
    PrivateCredit_USA: parseFloat(row.PrivateCredit_USA) || null,
    PrivateCredit_EMU: parseFloat(row.PrivateCredit_EMU) || null,
    PrivateCredit_GBR: parseFloat(row.PrivateCredit_GBR) || null,
    PrivateCredit_JPN: parseFloat(row.PrivateCredit_JPN) || null,
    PrivateCredit_CHN: parseFloat(row.PrivateCredit_CHN) || null,
    PrivateCredit_CHE: parseFloat(row.PrivateCredit_CHE) || null,
    
    // Currency Value
    inflation_USA: parseFloat(row.inflation_USA) || null,
    inflation_EMU: parseFloat(row.inflation_EMU) || null,
    inflation_GBR: parseFloat(row.inflation_GBR) || null,
    inflation_JPN: parseFloat(row.inflation_JPN) || null,
    inflation_CHN: parseFloat(row.inflation_CHN) || null,
    inflation_CHE: parseFloat(row.inflation_CHE) || null,
    
    EXVOL_USA: parseFloat(row.EXVOL_USA) || null,
    EXVOL_EMU: parseFloat(row.EXVOL_EMU) || null,
    EXVOL_GBR: parseFloat(row.EXVOL_GBR) || null,
    EXVOL_JPN: parseFloat(row.EXVOL_JPN) || null,
    EXVOL_CHN: parseFloat(row.EXVOL_CHN) || null,
    EXVOL_CHE: parseFloat(row.EXVOL_CHE) || null,
    
    gdpgrowth_USA: parseFloat(row.gdpgrowth_USA) || null,
    gdpgrowth_EMU: parseFloat(row.gdpgrowth_EMU) || null,
    gdpgrowth_GBR: parseFloat(row.gdpgrowth_GBR) || null,
    gdpgrowth_JPN: parseFloat(row.gdpgrowth_JPN) || null,
    gdpgrowth_CHN: parseFloat(row.gdpgrowth_CHN) || null,
    gdpgrowth_CHE: parseFloat(row.gdpgrowth_CHE) || null,
    
    r_USA: parseFloat(row.r_USA) || null,
    r_EMU: parseFloat(row.r_EMU) || null,
    r_GBR: parseFloat(row.r_GBR) || null,
    r_JPN: parseFloat(row.r_JPN) || null,
    r_CHN: parseFloat(row.r_CHN) || null,
    r_CHE: parseFloat(row.r_CHE) || null,
    
    // Financial Openness
    kaopen_USA: parseFloat(row.kaopen_USA) || null,
    kaopen_EMU: parseFloat(row.kaopen_EMU) || null,
    kaopen_GBR: parseFloat(row.kaopen_GBR) || null,
    kaopen_JPN: parseFloat(row.kaopen_JPN) || null,
    kaopen_CHN: parseFloat(row.kaopen_CHN) || null,
    kaopen_CHE: parseFloat(row.kaopen_CHE) || null,
    
    // Institutional Quality
    freedom_USA: parseFloat(row.freedom_USA) || null,
    freedom_EMU: parseFloat(row.freedom_EMU) || null,
    freedom_GBR: parseFloat(row.freedom_GBR) || null,
    freedom_JPN: parseFloat(row.freedom_JPN) || null,
    freedom_CHN: parseFloat(row.freedom_CHN) || null,
    freedom_CHE: parseFloat(row.freedom_CHE) || null,
    
    // Geopolitical Influence
    military_USA: parseFloat(row.military_USA) || null,
    military_EMU: parseFloat(row.military_EMU) || null,
    military_GBR: parseFloat(row.military_GBR) || null,
    military_JPN: parseFloat(row.military_JPN) || null,
    military_CHN: parseFloat(row.military_CHN) || null,
    military_CHE: parseFloat(row.military_CHE) || null,
    
    ArmedPerson_USA: parseFloat(row.ArmedPerson_USA) || null,
    ArmedPerson_EMU: parseFloat(row.ArmedPerson_EMU) || null,
    ArmedPerson_GBR: parseFloat(row.ArmedPerson_GBR) || null,
    ArmedPerson_JPN: parseFloat(row.ArmedPerson_JPN) || null,
    ArmedPerson_CHN: parseFloat(row.ArmedPerson_CHN) || null,
    ArmedPerson_CHE: parseFloat(row.ArmedPerson_CHE) || null,
    
    FDI_USA: parseFloat(row.FDI_USA) || null,
    FDI_EMU: parseFloat(row.FDI_EMU) || null,
    FDI_GBR: parseFloat(row.FDI_GBR) || null,
    FDI_JPN: parseFloat(row.FDI_JPN) || null,
    FDI_CHN: parseFloat(row.FDI_CHN) || null,
    FDI_CHE: parseFloat(row.FDI_CHE) || null,
    
    patents_USA: parseFloat(row.patents_USA) || null,
    patents_EMU: parseFloat(row.patents_EMU) || null,
    patents_GBR: parseFloat(row.patents_GBR) || null,
    patents_JPN: parseFloat(row.patents_JPN) || null,
    patents_CHN: parseFloat(row.patents_CHN) || null,
    patents_CHE: parseFloat(row.patents_CHE) || null,
    
    sanction_sender_USA: parseFloat(row.sanction_sender_USA) || null,
    sanction_sender_EMU: parseFloat(row.sanction_sender_EMU) || null,
    sanction_sender_GBR: parseFloat(row.sanction_sender_GBR) || null,
    sanction_sender_JPN: parseFloat(row.sanction_sender_JPN) || null,
    sanction_sender_CHN: parseFloat(row.sanction_sender_CHN) || null,
    sanction_sender_CHE: parseFloat(row.sanction_sender_CHE) || null,
    
    sanction_target_USA: parseFloat(row.sanction_target_USA) || null,
    sanction_target_EMU: parseFloat(row.sanction_target_EMU) || null,
    sanction_target_GBR: parseFloat(row.sanction_target_GBR) || null,
    sanction_target_JPN: parseFloat(row.sanction_target_JPN) || null,
    sanction_target_CHN: parseFloat(row.sanction_target_CHN) || null,
    sanction_target_CHE: parseFloat(row.sanction_target_CHE) || null
    }));
    
    setData(processedData);
} catch (error) {
    console.error('Error loading data:', error);
}
};

loadData();
}, []);

return (
<div className="space-y-6 p-6">
<Tabs defaultValue="currency_measures" className="w-full">
    <TabsList className="grid w-full grid-cols-7">
    <TabsTrigger value="currency_measures">Int'l Currency</TabsTrigger>
    <TabsTrigger value="economic">Economic Size</TabsTrigger>
    <TabsTrigger value="financial">Financial Markets</TabsTrigger>
    <TabsTrigger value="currency">Currency Value</TabsTrigger>
    <TabsTrigger value="openness">Financial Openness</TabsTrigger>
    <TabsTrigger value="institutional">Institutional</TabsTrigger>
    <TabsTrigger value="geopolitical">Geopolitical</TabsTrigger>
    </TabsList>
    
    <InternationalCurrencyPanel data={data} />
    <EconomicPanel data={data} />
    <FinancialPanel data={data} />
    <CurrencyPanel data={data} />
    <OpennessPanel data={data} />
    <InstitutionalPanel data={data} />
    <GeopoliticalPanel data={data} />
</Tabs>
</div>
);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(FeatureDashboard));