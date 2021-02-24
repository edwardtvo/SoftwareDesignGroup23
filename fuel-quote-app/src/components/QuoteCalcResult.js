
const QuoteCalcResult = ({perGal, total}) => {
    return (
        <div>
            <h2>Price per gallon: {perGal}</h2>
            <h2>Total Cost: {Number(total)}</h2>
        </div>
    )
}

export default QuoteCalcResult