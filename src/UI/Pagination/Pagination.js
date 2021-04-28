import React, {Component} from 'react';

import classes from './Pagination.css';

class Pagination extends Component {

    render() {
        let totalPages = 0;
        let styleBackwards = null;
        let styleOne = null;
        let styleTwo = null;
        let styleThree = null;
        let styleFour = null;
        let styleFive = null;
        let styleSix = null;
        let styleForwards = null;
        if (this.props.page !== undefined) {
            totalPages = this.props.page.totalPages;
            styleBackwards = this.props.currentPage === 0 ? classes.PageDisabled : null;
            styleOne = totalPages - 1 < 0 ? classes.PageDisabled : this.props.currentPage === 0 ? classes.active : null;
            styleTwo = totalPages - 2 < 0 ? classes.PageDisabled : this.props.currentPage === 1 ? classes.active : null;
            styleThree = totalPages - 3 < 0 ? classes.PageDisabled : this.props.currentPage === 2 ? classes.active : null;
            styleFour = totalPages - 4 < 0 ? classes.PageDisabled : this.props.currentPage === 3 ? classes.active : null;
            styleFive = totalPages - 5 < 0 ? classes.PageDisabled : this.props.currentPage === 4 ? classes.active : null;
            styleSix = totalPages - 6 < 0 ? classes.PageDisabled : this.props.currentPage === 5 ? classes.active : null;
            styleForwards = this.props.currentPage >= totalPages - 1 ? classes.PageDisabled : null;
        }
        return (
            <div className={classes.Pagination}>
                <a href="#" onClick={() => this.props.onClickPage(this.props.currentPage - 1)} className={styleBackwards}>&laquo;</a>
                <a href="#" onClick={() => this.props.onClickPage(0)} className={styleOne} >1</a>
                <a href="#" onClick={() => this.props.onClickPage(1)} className={styleTwo}>2</a>
                <a href="#" onClick={() => this.props.onClickPage(2)} className={styleThree}>3</a>
                <a href="#" onClick={() => this.props.onClickPage(3)} className={styleFour}>4</a>
                <a href="#" onClick={() => this.props.onClickPage(4)} className={styleFive}>5</a>
                <a href="#" onClick={() => this.props.onClickPage(5)} className={styleSix}>6</a>
                <a href="#" onClick={() => this.props.onClickPage(this.props.currentPage + 1)} className={styleForwards}>&raquo;</a>
            </div>
        );
    }
}

export default Pagination;