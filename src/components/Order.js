// let's go!
import React from 'react';
import { formatPrice } from '../helpers'
class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder(key) {
        console.log(this.props)
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeBtn = <button onClick={() => this.props.removeOrder(key)}>Remove Order</button>
        if (!fish || fish.status === 'unavailable') {
            return <li key={key}>
                Sorry, {fish ? fish.name : 'Fish'} is no longer available!{removeBtn}
            </li>
        }
        return (
            <li key={key}>
                <span>
                    {count}kgs {fish.name}
                </span>
                <span className="price">
                    {formatPrice(count * fish.price)}
                </span>
                {removeBtn}
            </li>
        )
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
        }, 0);
        return (
            <div className="order-wrap">
                <h2>
                    Orders
                </h2>
                <ul className="order"> 
                    {orderIds.map(this.renderOrder)}
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Order;