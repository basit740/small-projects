import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems } from '../../api/order';

const initialState = {
	name: 'cartSlice',
	cart: [],
	totalItems: 0,
	cartSummary: [],
	totalCartPrice: 0,
};

export const fetchCartItems = createAsyncThunk(
	'cartSlice/fetchCartItems',
	async (_, { rejectWithValue }) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) return rejectWithValue();
			const initialCart = await getCartItems(token);
			return initialCart;
		} catch (error) {
			return rejectWithValue();
		}
	}
);

const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		saveCart: (state, action) => {
			state.cart = [...action.payload.cart];

			state.totalItems = action.payload.cart.reduce(
				(accumulator, currentItem) => {
					return accumulator + currentItem.quantity;
				},
				0
			);

			// Create cartSummary from the new cart state
			state.cartSummary = action.payload.cart.map((item) => ({
				...item.product,
				totalQuantity: item.quantity,
				totalPrice: item.quantity * item.product.price,
			}));

			// Calculate the total price of the whole cart
			state.totalCartPrice = state.cartSummary.reduce(
				(accumulator, currentItem) => {
					return accumulator + currentItem.totalPrice;
				},
				0
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCartItems.fulfilled, (state, action) => {
			state.cart = action.payload;

			state.totalItems = action.payload.reduce((accumulator, currentItem) => {
				return accumulator + currentItem.quantity;
			}, 0);

			// Create cartSummary from the new cart state
			state.cartSummary = action.payload.map((item) => ({
				...item.product,
				totalQuantity: item.quantity,
				totalPrice: item.quantity * item.product.price,
			}));

			// Calculate the total price of the whole cart
			state.totalCartPrice = state.cartSummary.reduce(
				(accumulator, currentItem) => {
					return accumulator + currentItem.totalPrice;
				},
				0
			);
		});
	},
});

export const { saveCart } = cartSlice.actions;
export default cartSlice.reducer;
