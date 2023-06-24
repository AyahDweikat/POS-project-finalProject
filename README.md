# **POS Project**

- **A Point-of-Sale System (POS)**
- [ ]  A web application for supermarkets to manage products and carts, including the ability to handle multiple carts and calculate the total amount for each order. Each cart can be added a description for more details.
- **Pages**
- **Products Page**
- [ ]  A page that contains a list of all products in the system, allowing users to view, add, update, or delete a product.
- [ ]  Each product should have the following properties:
    - [x]  Product Name.
    - [x]  Product Code.
    - [x]  Product Category - Can be selected from a list of product categories.
    - [ ]  Product Image.
    - [x]  Product Price
    - [x]  Unit of Measure

- **Product Categories Page**
- [x]  A page that contains a list of all product categories in the system, enabling users to view, add, update, or delete a product category.
- [x]  Each category should have the following properties:
    - [x]  Category Name.

- **Unit Of Measure Page**
- [x]  A page that contains a list of all unit of measures in the system, enabling users to view, add, update, or delete a unit of measures.
- [x]  Each unit of measure should have the following properties:
    - [x]  unit of measure Name.
    - [x]  base unit of Measure (text)
    - [x]  Conversion factor to the base unit of measure

- **POS Page**
- [ ]  A page for the cashier to manage customers' carts. This includes the ability to create and manage multiple carts and add descriptions to them for additional information.
- [ ]  The page should have a UI to initiate new cart checkouts.
    - [ ]  Multiple carts can be managed simultaneously, each with a unique identifier.
    - [x]  Each cart can have a custom description added to it.
    - [ ]  User can add products to the cart.
    - [ ]  User can change added product quantity.
    - [x]  User can delete a product from the cart.
    - [x]  User can edit the tax applied.
    - [x]  User can apply a discount.
    - [ ]  The list of products should be searchable and filterable by product category.
    
- **Multiple Carts**
- [x]  Each cart should be individually identifiable, preferably by a unique ID.
- [x]  Each cart should have its own set of products, quantity, tax, and discount data.
- [ ]  There should be a functionality to switch between different carts seamlessly.
- [ ]  Each cart has a checkout button that complete the cart

- [x]  **(Bonus) Login Page**
- [x]  A login page and authentication system.

## **Technical Details**

- Tech Stack:
    - [x]  **`React`** for rendering UI.
    - [x]  **`Formik`** for handling forms state.
    - [x]  **`react-router`** for navigation and router management.
    - [x]  (bonus) **`typescript`** for type checking.
    - [ ]  (bonus) **`redux`** for state management.
    - [ ]  (bonus) **`storybook`** for building components in isolation.
- [x]  You should use git for version control.
- [x]  You should have a shell that can be used to navigate between pages (like a side navbar or a top app ribbon).
- [x]  You are free to implement a backend or use a mock server to mock the backend requests. Options:
    - **`~~json-server`** with a delay~~
    - [x]  (bonus) implementing the backend side
- [ ]  unit testing.
- [x]  Don’t use an already existing table components.