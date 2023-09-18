import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../../contexts/cart-context";
import { useNavigate } from "react-router-dom";
import classes from "./Forms.module.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const ConfirmDialog = ({ isOpen, onClose, products }) => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
    libraries,
    language: "en",
  });
  const ref = useRef();
  const { cart, data, setData } = useContext(CartContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const writeItems = () => {
    let temp = [];
    let total = 0;
    let sellers = [];
    for (const i in cart) {
      if (cart[i] !== 0) {
        const prod = products.find((it) => it.id === parseInt(i));
        if (!prod) continue;
        temp = [...temp, { ...prod, quantity: cart[i] }];
        total += prod.price * cart[i];
        if (!sellers.find((it) => it === prod.sellerId))
          sellers = [...sellers, prod.sellerId];
      }
    }

    if (!isLoaded)
      return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>Loading...</ModalBody>
          </ModalContent>
        </Modal>
      );

    return (
      <>
        {temp.map((o, index) => (
          <div key={index}>
            <div className={classes.wrap}>
              <div className={classes.wrapLeft}>Naziv: {o.name}</div>
              <div className={classes.wrapRight}>
                <div>Kol: {o.quantity}</div>
                <div>Cijena: {o.price}</div>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <div style={{ color: "red", fontSize: 20 }}>
          Ukupno: {total.toFixed(2)}${" "}
        </div>
        <div style={{ color: "red", fontSize: 20 }}>
          Dostava: {sellers.length * 3.5}${" "}
        </div>
      </>
    );
  };

  const handleGoToPayment = async (e) => {
    if (!data.deliveryAddress || !data.positionX || !data.positionY) {
      console.log("***********");
      console.log(data);
      alert("Please enter address");
      return;
    }
    navigate("/PayPal");
  };

  const handlePlaceChange = () => {
    const address = ref.current.getPlace();
    console.log(
      "🚀 ~ file: ConfirmDialog.jsx:74 ~ handlePlaceChange ~ address:",
      address
    );
    if (address && address.formatted_address) {
      setData({
        ...data,
        deliveryAddress: address.formatted_address,
        positionX: address.geometry.location.lat(),
        positionY: address.geometry.location.lng(),
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Potvrdite vašu porudžbinu</ModalHeader>
        <ModalBody>
          <div>{writeItems()}</div>
          <Autocomplete
            onLoad={(cm) => (ref.current = cm)}
            onPlaceChanged={handlePlaceChange}
          >
            <Input
              autoFocus
              margin="dense"
              id="deliveryAddress"
              placeholder="Adresa"
              type="text"
              variant="filled"
              value={data.deliveryAddress}
              onChange={handleChange}
            />
          </Autocomplete>
          <Input
            autoFocus
            margin="dense"
            id="comment"
            placeholder="Komentar (opciono)"
            type="text"
            variant="filled"
            value={data.comment}
            onChange={handleChange}
          />
        </ModalBody>
        <ModalFooter gap="1rem">
          <Button colorScheme="red" onClick={onClose}>
            Otkaži
          </Button>
          <Button colorScheme="green" onClick={handleGoToPayment}>
            Idi na plaćanje
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDialog;
