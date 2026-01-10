# Coupons Management API – Monk Commerce Assignment

## Overview

This project implements a RESTful Coupons Management API for an e-commerce platform. The system allows creation, retrieval, and application of different coupon types to a cart while keeping the design extensible for future coupon types.

## Tech Stack

- Backend: Node.js, Express (ES Modules)
- Database: MongoDB (Mongoose)
- API Style: REST
- Environment: Local development

## Implemented Coupon Types

### 1. Cart-wise Coupons

Description
Applies a percentage discount to the entire cart if the cart total exceeds a specified threshold.

Example

- Condition: Cart total > 100
- Discount: 10% off the entire cart

Implementation Details

- Cart total is calculated as sum(quantity × price) for all items
- Discount is applied only if the threshold condition is met
- Discount is applied at cart level, not distributed per item

### 2. Product-wise Coupons

Description
Applies a percentage discount to specific products present in the cart.

Example

- Condition: Product ID 1 is present in the cart
- Discount: 20% off Product ID 1

Implementation Details

- Coupon specifies an array of eligible product IDs
- Discount is applied only to matching cart items
- Discount is calculated per product (quantity × price)
- Non-eligible products receive no discount

## API Endpoints

### Coupon CRUD

- POST /coupons
- GET /coupons
- GET /coupons/:id
- PUT /coupons/:id
- DELETE /coupons/:id

### POST /applicable-coupons

Purpose
Returns all coupons applicable to a given cart along with the discount each coupon would provide.

Behavior

- Evaluates all active coupons
- Returns only coupons whose conditions are satisfied
- Does not mutate cart data

### POST /apply-coupon/:id

Purpose
Applies a specific coupon to a cart and returns the updated cart with discounts applied.

Behavior

- Validates coupon existence and applicability
- Applies exactly one coupon per request
- Returns updated cart summary including:
  - item-level discounts
  - total price
  - total discount
  - final price

## Database Design

Coupons are stored in a single collection with a polymorphic design:

Fields

- type: cart-wise | product-wise | bxgy
- details: flexible object containing coupon-specific rules
- isActive
- expiresAt (optional)
- timestamps

This design allows new coupon types to be added with minimal schema changes.

## Assumptions

- Only one coupon can be applied to a cart at a time
- Cart data is stateless and provided entirely by the client
- Product prices are final and tax-inclusive
- Product IDs provided in the cart are valid
- Coupons are assumed to be pre-validated on creation
- Currency handling is out of scope

## Limitations

- Coupon stacking is not supported
- BxGy coupons are not implemented
- No user-specific coupon usage limits
- No concurrency handling for coupon usage
- No tax, shipping, or currency conversions
- No coupon usage count or redemption tracking

## Unimplemented Cases

The following cases were identified but not implemented due to time constraints:

- Buy X Get Y (BxGy) coupons with repetition limits
- Partial BxGy fulfillment scenarios
- Coupon priority resolution when multiple coupons apply
- Maximum discount caps
- Coupon usage limits per user
- Coupon usage history and analytics
- Timezone-aware coupon expiration handling
- Combining cart-wise and product-wise discounts

## Extensibility

The system is designed with extensibility in mind:

- Coupon logic is separated into services
- Coupon type handling is centralized
- New coupon types can be added without modifying existing ones

Future coupon types can be implemented by adding new services and extending the evaluation logic.

## Running the Project

1. Install dependencies
   npm install

2. Configure environment variables
   Set Port & MongoDB connection string in `.env`

3. Start the server
   npm run dev

4. Server runs on (if PORT=3000)
   [http://localhost:3000](http://localhost:3000)

[Postman](https://anurupm049-2903959.postman.co/workspace/Anurup's-Team's-Workspace~7d447397-5e05-41c8-80a8-87bcacd3250c/collection/51376700-a7f84469-bb81-4041-a4b5-bf5a53456cd6?action=share&source=copy-link&creator=51376700)
