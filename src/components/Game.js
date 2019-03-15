import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { startGame, lightUp, isTurn, newRound, nextTurn, gameOver, changeLevel } from '../actions/simonActions';
import classnames from 'classnames';

class Game extends Component {
  handleClick = (e) => {
    let { id } = e.target;
    const { isTurn, turn, list, level } = this.props.game;

    if (isTurn) { // Если настал ход игрока
      if (list[turn].toString() === id) { // Сравниваем туда ли он нажал

        this.props.lightUp(id, 50); // Загораем квадратик
        this.props.nextTurn(); // Добавляем ход

        if (list.length <= turn+1) { // Проверяем нажал ли игрок все квадратики
          this.props.newRound(list, level); // Добавляем новый квадратик и обнуляем ходы в ноль
        }
      } else {
        this.props.gameOver(); // Если не верно нажал и проиграл
      }
    }
  }

  // Стартуем игру  
  startGame = () => {
    if (!this.props.game.isGame) { // Проверяем не начата ли уже игра
      console.log('ИГРА НАЧАЛАС')
      this.props.startGame(); // Стартуем игру
    }
  }

  onChangeLevel = (e) => {
    if (!this.props.game.isGame) {
      this.props.changeLevel(e.target.value)
    }
  }

  render() {
    const { fields, list, isOver, level } = this.props.game;

    return (
      <Fragment>
        <header>
          <h1>Simon the Game</h1>
          <h2>Round: {list.length}</h2>
          <span>Level:</span>
          <select value={level} onChange={this.onChangeLevel}>
            <option value='1500'>Easy</option>
            <option value='1000'>Normal</option>
            <option value='400'>Hard</option>
          </select>
        </header>

        <section className="game">
          <div className="group">
            <div id='0' onClick={this.handleClick} className={classnames(`square red`, {'anim': fields[0] })}></div>
            <div id='1' onClick={this.handleClick} className={classnames(`square green`, {'anim': fields[1] })}></div>
          </div>
          <div className="group">
            <div id='2' onClick={this.handleClick} className={classnames(`square blue`, {'anim': fields[2] })}></div>
            <div id='3' onClick={this.handleClick} className={classnames(`square yellow`, {'anim': fields[3] })}></div>
          </div>
          {isOver && <h3>You loose after {list.length} rounds</h3>}
          <button onClick={this.startGame}>Start game</button>
        </section>

      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  game: state.simonReducer
});

export default connect(mapStateToProps, { startGame, lightUp, isTurn, newRound, nextTurn, gameOver, changeLevel })(Game);