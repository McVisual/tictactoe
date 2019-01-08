import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// This program will let you play tic tac toe
// Indicates when a player has won the game
// Stores a game's history as a game progresses
// Allows players to review a game's history and see previous versions of a game's board

// Square is a function component that only contains a render method and don't have their own state
function Square(props){
      return (
        <button 
            className="square" 
            onClick={props.onClick }>
          {props.value}
        </button>
      );
    }
  
  // The Board component maintains state and has full control over the Square component
  class Board extends React.Component {

    renderSquare(i) {
      return ( 
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                />
            );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
      };
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step%2)===0,
      });
    }

    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber+1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();

      // Ignores click if someone has won the game of if a Square is already filled
      if(calculateWinner(squares) || squares[i]){
        return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner ' + winner; 
      }
      else {
        status = 'Next Player ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  