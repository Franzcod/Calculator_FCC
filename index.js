

function App() {

    const [expresion, setExpresion] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [decimal, setDecimal] = React.useState(false);

    const display = (symbol) => {
        // setExpresion(prev => prev + symbol);
        if(symbol === '.'){
            setDecimal(true);
        }
        if(expresion[expresion.length -1] === '='){
            if(/[1-9.]/.test(symbol)){
                setExpresion(symbol);
            } else {
                setExpresion(answer);
            }
        }
        if(symbol === '-' || symbol === '+' || symbol === '*' || symbol === '/'){
            setAnswer(symbol);
            setExpresion(prev => prev + symbol);
            setDecimal(false);
        }
        else{
            if(answer === '0'){
                setAnswer('');
                setExpresion('');
            }
            if(decimal && symbol === '.'){
                setAnswer(prev => prev);
                setExpresion(prev => prev);
                
                return
            }
            setAnswer(prev => prev + symbol);
            setExpresion(prev => prev + symbol);
        }
    }

    const revisar = (string) => {
        let cuenta = string.split('')
        for(let i =0; i < cuenta.length; i++){
            if(cuenta[i] === '+'  || cuenta[i] === '*' || cuenta[i] === '/'){
                if(cuenta[i-1] === '+' || cuenta[i-1] === '-' || cuenta[i-1] === '*' || cuenta[i-1] === '/'){
                    cuenta.splice(i, 1);
                }
            }

        }
        console.log(cuenta,' = ',eval(cuenta.join('')));
        return cuenta.join('');
    }

    const calculate = () => {
        try {
           
            setAnswer(eval( revisar(expresion)));
            setExpresion(prev => prev + '=');
        } catch (e) {
            setExpresion('Error');
            setTimeout(() => {
                allClear()
            }, 400);
        }
    }

    const allClear = () => {
        setExpresion('');
        setAnswer('0');
        setDecimal(false);
    }

    const clear = () => {
        setExpresion(prev => prev.slice(0, -1));
    }

    return (
        <div className="container">
            <div className="header">
                <div className="titulo fcc"> FreeCodeCamp</div>
                <div className="panel"></div>
            </div>
            <div className="grid">
                
                <div  className="dis" >
                    <input type="text" placeholder="0" value={expresion} readOnly />
                    <div className="total" id="display">{answer}</div>
                </div>

                <div onClick={allClear} className="padButton AC tomato" id="clear">AC</div>
                <div onClick={clear} className="padButton C tomato">C</div>
                <div onClick={()=>display("/")} className="padButton div" id="divide">/</div>
                <div onClick={()=>display("*")} className="padButton times" id="multiply">x</div>

                <div onClick={()=>display("7")} className="padButton seven dark-grey" id="seven">7</div>
                <div onClick={()=>display("8")} className="padButton eight dark-grey" id="eight">8</div>
                <div onClick={()=>display("9")} className="padButton nine dark-grey"
                id="nine">9</div>
                <div onClick={()=>display("-")} className="padButton minus" id="subtract">-</div>

                <div onClick={()=>display("4")} className="padButton four dark-grey" id="four">4</div>
                <div onClick={()=>display("5")} className="padButton five dark-grey" id="five">5</div>
                <div onClick={()=>display("6")} className="padButton six dark-grey" id="six">6</div>
                <div onClick={()=>display("+")} className="padButton plus" id="add">+</div>

                <div onClick={()=>display("1")} className="padButton one dark-grey" id="one">1</div>
                <div onClick={()=>display("2")} className="padButton two dark-grey" id="two">2</div>
                <div onClick={()=>display("3")} className="padButton three dark-grey"
                id="three">3</div>
                <div onClick={calculate} className="padButton equals blue" id="equals">=</div>

                <div onClick={()=>display("0")} className="padButton zero dark-grey" id="zero">0</div>
                <div onClick={()=>display(".")} className="padButton dot dark-grey" id="decimal">.</div>
            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));