import React from 'react';
import classNames from 'classnames';
import './PulltorefreshComponent.css';

export default class PulltorefreshComponent extends React.Component {


    constructor(props) {
        super(props);

        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);

        this.state = {swiped: false, moveY: 0, showHead: false, loading: false};
        this._swipe = {};
        this.minDistance = 50;
        this.maxDistance = 100;
    }

    _onTouchStart(e) {
        if(this.state.loading) return;
        const touch = e.touches[0];
        this._swipe = {y: touch.clientY};
        this.setState({swiped: false});
        console.log('touch start:y:' + touch.clientY);
    }

    _onTouchMove(e) {

        if(this.state.loading) return;
        const touch = e.changedTouches[0];
        // console.log(e);
        console.log('touch move:y' + touch.clientY);
        // this._swipe.y=touch.clientY;


        let absY = touch.clientY - this._swipe.y;
        if (absY > this.maxDistance) absY = this.maxDistance;

        if (absY < 0) return;
        this.setState({
            moveY: absY
        });
        if (e.changedTouches && e.changedTouches.length) {

            this._swipe.swiping = true;
        }
    }

    _onTouchEnd(e) {
        if(this.state.loading) return;
        const touch = e.changedTouches[0];
        const absY = touch.clientY - this._swipe.y;
        if (this._swipe.swiping && absY > this.minDistance) {
            this.props.onSwiped && this.props.onSwiped();
            this.setState({swiped: true, moveY: 50, loading: true});
            setTimeout(() => {
                this.setState({
                    moveY: 0,
                    loading: false
                });
                //  setTimeout(()=>this.setState({showHead:false}),1000);
            }, 6000);
        } else {
            this.setState({moveY: 0});
        }
        this._swipe = {};
        console.log('touch end:y:' + touch.clientY);
        console.log('touch end:y:' + absY);
    }

    render() {
        return (

            <div>
                <div className={classNames({refreshHead: true, gone: this.state.moveY === 0})}
                     style={{height: this.state.moveY + 'px', textAlign: 'bottoms'}}>

                        <img src={'https://assets.imedao.com/images/logos/logo.2015.png'}
                             className={classNames({headLoadingIcon: true, playAnimation: this.state.loading})}
                             style={{marginTop: this.state.moveY / 2 + 'px'}}/>
                        <span  className={classNames({headLoadingText: true })}  style={{marginTop: this.state.moveY / 2 + 'px'}}  > loading</span>

                </div>
                <div style={{height: '300px', backgroundColor: '#ff0000'}}
                     onTouchStart={this._onTouchStart}
                     onTouchMove={this._onTouchMove}
                     onTouchEnd={this._onTouchEnd}>
                    {`Component-${this.state.swiped ? 'swiped' : ''}`}
                </div>

            </div>

    )
        ;
    }

}