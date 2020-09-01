import React from 'react'
import CartList from '../components/CartList'
import CartDiscount from '../components/CartDiscount'
import CartConfirm from '../components/CartConfirm'


export default function CartPage() {
    return (
        <div className="cartPage">
            <div>
                <div>
                    <CartList />
                </div>
                <CartDiscount />
            </div>
            <CartConfirm />
        </div>
    )
}