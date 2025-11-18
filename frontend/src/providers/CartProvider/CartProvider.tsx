'use client'

import { createContext, ReactNode, useState } from "react";

interface CartContextProvider {
    cartProducts: Record<string, number>;
    inCartProduct: (productId: string) => void;
    decCartProduct: (productId: string) => void;
}

const initialCart: CartContextProvider = {
    cartProducts: {},
    inCartProduct: () => {},
    decCartProduct: () => {}
}

export const CartContext = createContext<CartContextProvider>(initialCart);

function CartProvider({children}: {children : ReactNode}) {
    const [cartProducts, setCartProducts] = useState<Record<string,number>>({});
    const inCartProduct = (productId: string) => {
        setCartProducts(c => ({
            ...c,
            [productId]: (c[productId] ?? 0) + 1
        }))
    }
    const decCartProduct = (productId: string) => {
        if((cartProducts[productId] ?? 0) === 1){
            const copyCartProducts = {...cartProducts}
            delete copyCartProducts[productId]
            setCartProducts(copyCartProducts)
        } else {
            setCartProducts((c) => ({
                ...c,
                [productId]: (c[productId] ?? 0) - 1
            }))
        }
    }
    return <CartContext.Provider value={{cartProducts, inCartProduct, decCartProduct}}>{children}</CartContext.Provider>
};

export default CartProvider;