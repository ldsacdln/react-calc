import React, { useState, useEffect }  from "react";

function App() {
  const [disp, setDisp] = useState('');
  const [operation, setOperation] = useState<any[]>([]);

  useEffect(() => {
    const screen = operation.toString().replace(/,/g, '');
    setDisp(screen);
  }, [operation]);

  function clickNumber(val: number){
    return() => {
      const position = operation.length-1;       
      if(isNaN(operation[position])){
        operation.push(val);
      }
      else{
        operation[position] = operation[position]*10 + val;
      }
      setOperation([...operation]);
    }
  }

  function clickOperator(val: String){
    return() => {
      const position = operation.length-1;
      const str = operation[position];
      if(typeof str !== 'number'){
          operation.pop();    
      }
      operation.push(val)
      setOperation([...operation]);
    }
  }

  function result(){
    return() => {
      let result = [...operation];
      result = calculate(result,'*');
      result = calculate(result,'/');
      result = calculate(result,'-');
      result = calculate(result,'+');
      setOperation([result[0]]);
    }
  }

  const calculate = (list:any[], simbol: string) => {
    let result = 0;
    list.forEach((item,i) => {
      if(item === simbol){
        result = CalculatorOperations[simbol](list[i-1], list[i+1]);
        list.splice (i-1, 3, result);
      }
    });
    return list;
  }

  const CalculatorOperations:any = {
    '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
    '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
    '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
    '+': (prevValue: number, nextValue: number) => prevValue + nextValue
  }

  return (
    <div className="calculator">
      <input data-testid="display" className="display" type="text" disabled value={disp}></input>

      <div className="btn-container">
        <button data-testid="btn-clear" className="btn wide" onClick={() => {setDisp(""); setOperation([])}}>C</button>
        <button data-testid="btn-div" className="btn" onClick={clickOperator("/")}>/</button>

        <button data-testid="btn-7" className="btn" onClick={clickNumber(7)}>7</button>
        <button data-testid="btn-8" className="btn" onClick={clickNumber(8)}>8</button>
        <button data-testid="btn-9" className="btn" onClick={clickNumber(9)}>9</button>
        <button data-testid="btn-mul" className="btn" onClick={clickOperator("*")}>*</button>

        <button data-testid="btn-4" className="btn" onClick={clickNumber(4)}>4</button>
        <button data-testid="btn-5" className="btn" onClick={clickNumber(5)}>5</button>
        <button data-testid="btn-6" className="btn" onClick={clickNumber(6)}>6</button>
        <button data-testid="btn-sub" className="btn" onClick={clickOperator("-")}>-</button>

        <button data-testid="btn-1" className="btn" onClick={clickNumber(1)}>1</button>
        <button data-testid="btn-2" className="btn" onClick={clickNumber(2)}>2</button>
        <button data-testid="btn-3" className="btn" onClick={clickNumber(3)}>3</button>
        <button data-testid="btn-add" className="btn" onClick={clickOperator("+")}>+</button>

        <button data-testid="btn-0" className="btn wide" onClick={clickNumber(0)}>0</button>
        <button data-testid="btn-eval" className="btn" onClick={result()}>=</button>
      </div>
    </div>
  );
}

export default App;