import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import sellerApi from "../../../services/sellerApi";

const ProductAddForm = ({ updateProducts }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    amount: 0,
    price: 0,
    imageFile: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!data.name || !data.price || !data.description || !data.amount) {
      alert("Popunite sva polja");
      return;
    }

    if (!data.amount || data.amount < 0 || !parseInt(data.amount)) {
      alert("Količina mora biti pozitivan broj.");
      return;
    }

    if (!data.price || data.price < 0 || !parseFloat(data.price)) {
      alert("Cijena mora biti pozitivan broj.");
      return;
    }

    const formData = new FormData();
    for (const prop in data) {
      formData.append(prop, data[prop]);
    }

    sellerApi.postProduct(formData).then((res) => res && updateProducts());
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeNumber = (e) => {
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setData({
      ...data,
      [e.target.id]: value,
    });
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dodaj Proizvod</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.300">
          <ModalHeader color="black">Add product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" id="name" isRequired>
              <FormLabel>Naziv</FormLabel>
              <Input
                type="text"
                value={data.name}
                onChange={handleChange}
                variant="filled"
                color="white"
              />
            </FormControl>
            <FormControl pt="1rem" display="flex" id="price" isRequired>
              <FormLabel>Cijena</FormLabel>
              <Input
                type="number"
                value={data.price}
                onChange={handleChangeNumber}
                variant="filled"
                color="white"
              />
            </FormControl>
            <FormControl pt="1rem" display="flex" id="amount" isRequired>
              <FormLabel>Količina</FormLabel>
              <Input
                type="number"
                value={data.amount}
                onChange={handleChangeNumber}
                variant="filled"
                color="white"
              />
            </FormControl>
            <FormControl pt="1rem" display="flex" id="description" isRequired>
              <FormLabel>Opis</FormLabel>
              <Input
                type="text"
                value={data.description}
                onChange={handleChange}
                variant="filled"
                color="white"
              />
            </FormControl>
            <Text color="black" fontWeight="bold" mt="4">
              Slika
            </Text>
            <Input
              id="imageFile"
              type="file"
              accept="image/jpg"
              onChange={(e) => {
                setData({ ...data, imageFile: e.target.files[0] });
              }}
              color="white"
            />
          </ModalBody>
          <ModalFooter gap="1rem">
            <Button colorScheme="red" onClick={onClose}>
              Otkaži
            </Button>
            <Button colorScheme="green" onClick={handleSave}>
              Sačuvaj
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductAddForm;
