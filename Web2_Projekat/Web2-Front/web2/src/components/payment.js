// import { Box, Button, Heading } from "@chakra-ui/react";
// import { useContext } from "react";
// import { CartContext } from "../contexts/cart-context";
// import buyerApi from "../services/buyerApi";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const { cart, setCart, data, setData } = useContext(CartContext);
//   const navigate = useNavigate();

//   const handlePayPal = async (data, actions) => {
//     const temp = [];
//     for (const i in cart) {
//       temp.push({ productId: i, amount: cart[i] });
//     }

//     const price = await buyerApi.getPrice(temp);

//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: price.toFixed(2).toString(),
//             currency_code: "USD",
//           },
//         },
//       ],
//     });
//   };

//   const handleOrder = async () => {
//     const sendData = { ...data, items: [] };
//     for (const i in cart) {
//       if (cart[i] > 0) sendData.items.push({ productId: i, amount: cart[i] });
//     }
//     console.log(
//       "🚀 ~ file: Payment.jsx:39 ~ handleOrder ~ sendData:",
//       sendData
//     );
//     await buyerApi.postOrder(sendData);
//     setCart({});
//     setData({});
//     navigate("/PreviousOrders");
//   };

//   const handleApprove = (data, actions) => {
//     return actions.order.capture().then(async (details) => {
//       handleOrder();
//     });
//   };

//   return (
//     <Box h="100vh" bg="red" w="100vw" display="flex" alignContent="center">
//       <p>Nestooooo</p>
//       <Heading as="h1">NESTOOOOO</Heading>
//       <Box h="100vh" bg="red" w="100vw" display="flex" alignContent="center">
//         <Button variant="contained" color="primary" onClick={handleOrder}>
//           Pay when arrives
//         </Button>
//         <PayPalScriptProvider
//           options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
//         >
//           <PayPalButtons
//             createOrder={handlePayPal}
//             onApprove={handleApprove}
//             style={{ label: "pay" }}
//           />
//         </PayPalScriptProvider>
//       </Box>
//     </Box>
//   );
// };

// export default Payment;
