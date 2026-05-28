# Project Setup Video Link (Updated)

Click [here](https://youtu.be/KFLG79ANp3o) to learn how to set up the project.

# API Specification

Query parameter notation (:).

> ## Products Page:
>
> GET http://api.com/products \
> Description: Display all products \
> \
>  GET http://api.com/products/:id \
> Description: Redirect to the Product Details Page specific to a product

> ## Product Details Page:
>
> POST http://api.com/orders \
> Description: A new order is placed \
> \
> POST http://api.com/orders/:id/order_items \
> Description: Order item(s) are recorded when an order is placed \
> \
> POST http://api.com/movements \
> Description: New movement(s) are created after an order is placed \
> \
>  PATCH http://api.com/inventory/:id \
> Description: A specific inventory's info is modified. E.g., quantity is decreased

> ## Orders Page:
>
> GET http://api.com/orders \
> Description: Display all orders \
> \
> POST http://api.com/movements \
>  Description: New movement(s) are created after an order is cancelled \
>  \
> PATCH http://api.com/orders/:id \
> Description: A specific order's info is modified. E.g., user cancels the order \
> \
> PATCH http://api.com/inventory/:id \
> Description: A specific inventory's info is modified. E.g., quantity is increased

> ## Profile Page:
>
> GET http://api.com/orders \
> Description: Display all orders

> ## Admin Page:
>
> GET http://api.com/inventory \
>  Description: Display all inventory \
>  \
> GET http://api.com/movements \
>  Description: Display all movements \
>  \
> POST http://api.com/goods_receipts \
>  Description: A receipt is received \
>  \
> POST http://api.com/goods_receipts/:id/receipt_items \
> Description: Receipt item(s) are recorded when a receipt is received \
> \
> POST http://api.com/movements \
> Description: New movement(s) are created after a receipt is received \
> \
> PATCH http://api.com/inventory/:id \
> Description: A specific inventory's info is modified. E.g., admin restocks the inventory

### Note:

If I have missed anything or made a mistake, you may come up with your own API solution.

# Project Setup

```sh
npm install
```

## Compile and Hot-Reload for Development

```sh
npm run dev
```

## Compile and Minify for Production

```sh
npm run build
```
