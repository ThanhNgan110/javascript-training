# JAVASCRIPT PRACTICE

## OVERVIEW

- This is the document provided required for Javascript practice
- Design [Figma](<https://www.figma.com/file/4dPrq93GgtmlwmRfs7E3jf/Shopery---Organic-eCommerce-Shop-Website-Figma-Template-(Community)-(Community)?type=design&node-id=460-42486&mode=design&t=LfaCeksXjTSoiIBg-0>)

## TIMELINE

- Expected: 72 hours (2024/03/14 - 2024/03/26)
- Total:   200 hours (2024/03/14 - 2024/03/24)

## TEAM SIZE

- 1 dev

## TARGETS

- DOM manipulation.
- Structure project following MVC pattern.
- ES6 features.

## TECHNICAL STACK

- HTML5
- CSS3
- JAVASCRIPT
- JSON SERVER

## REQUIREMENTS


- Call API to get list product from json-server

- Search product by name

- For form validation
    - When user open modal form checkout, call the API get country and state from json-server
    - When user select country, render state of country
    - All fields not optional is need validate and show error mesage when user input invalid
    - If any field is invalid, should be disabled the button Place Order (except field is optional)

- For modal cart
    - When user click the delete button, the product will be hidden on the UI. Only when user click the button update cart will remove product from cart (call api delete)
    - When user click delete product (hiden product on UI) without not click the button update cart when close modal cart and reopened. The deleted product will be displayed
    - Render order summary when user click button update cart

## How to run

- Clone source

```
https://github.com/ThanhNgan110/javascript-training
```

- Git checkout feature/practice

```
git checkout feature/practice
```

- Go to folder json-server

```
cd json-server
```

- Install packages

```
npm install
```

- Run server

```
npm start
```

- Go to client folder

```
cd ..
```

- Install packages

```
npm install
```

- Run client

```
npm run dev
```


