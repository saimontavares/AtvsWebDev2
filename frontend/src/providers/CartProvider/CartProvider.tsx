'use client'

import api from "@/utils/api";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

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
    const user = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState<Record<string,number>>({});
    useEffect(() => {
        api.get("/purchase/cart").then((res) => {
            const cart: CartDto = res.data;
            const cartState: Record<string,number> = {};
            cart.purchaseItems.forEach((i) => {
                cartState[i.productId] = i.quantity;
            });
            setCartProducts(cartState);
        })
    }, [user]);
    const inCartProduct = async (productId: string) => {
        try {
            await api.post("/purchaseItem/inc", {productId});
        } catch (error) {
            console.log(error);
            return;
        }
        setCartProducts(c => ({
            ...c,
            [productId]: (c[productId] ?? 0) + 1
        }))
    }
    const decCartProduct = async (productId: string) => {
        try {
            await api.post("/purchaseItem/dec", {productId});
        } catch (error) {
            console.log(error);
            return;
        }
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