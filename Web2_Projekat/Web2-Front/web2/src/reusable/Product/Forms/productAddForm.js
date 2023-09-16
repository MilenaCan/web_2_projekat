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
      alert("All fields are required");
      return;
    }

    if (!data.amount || data.amount < 0 || !parseInt(data.amount)) {
      alert("Amount must be a positive integer.");
      return;
    }

    if (!data.price || data.price < 0 || !parseFloat(data.price)) {
      alert("Price must be a positive number.");
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
      <Button onClick={() => setIsOpen(true)}>Add product</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#0c1215">
          <ModalHeader color="white">Add product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={data.name}
                onChange={handleChange}
                variant="filled"
                color="white"
              />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={data.price}
                onChange={handleChangeNumber}
                variant="filled"
                color="white"
              />
            </FormControl>
            <FormControl id="amount" isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={data.amount}
                onChange={handleChangeNumber}
                variant="filled"
                color="white"
              />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={data.description}
                onChange={handleChange}
                variant="filled"
                color="white"
              />
            </FormControl>
            <Text color="white" fontWeight="bold" mt="4">
              Image
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
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductAddForm;
