import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import sellerApi from "../services/sellerApi";
import { dateTimeToString } from "../helpers/helpers";
import Item from "../reusable/Order/item";
import { Button, Text, VStack, Divider } from "@chakra-ui/react";

const Map = () => {
  const startPosition = [45.25472833688446, 19.83317432993583];
  const [orders, setOrders] = useState(null);

  const refresh = async () => {
    try {
      const res = await sellerApi.getNewOrders();
      setOrders(res);
    } catch (error) {
      console.error(error);
    }
  };

  const icon = new L.Icon({
    iconUrl: "package-icon.png",
    iconSize: [50, 50],
  });

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const status = (o) => {
    return o.isCancelled
      ? "Cancelled"
      : !o.approved
      ? "Waiting for approval"
      : new Date(o.deliveryTime) > new Date()
      ? "In delivery"
      : "Delivered";
  };

  return (
    <MapContainer
      center={startPosition}
      zoom={13}
      style={{ width: "100%", height: "100vh" }}
      scrollWheelZoom={true}
    >
      <TileLayer url={process.env.REACT_APP_MAP_API} />

      {orders &&
        orders.length !== 0 &&
        orders.map((o, i) => (
          <div key={i}>
            <Marker position={[o.positionX, o.positionY]} icon={icon}>
              <Popup style={{ background: "black" }}>
                <VStack align="start" spacing={2}>
                  <Text fontSize="lg">
                    Ordered: {dateTimeToString(o.orderTime)}
                  </Text>
                  <Text fontSize="lg">Address: {o.deliveryAddress}</Text>
                  <Text fontSize="lg">Status: {status(o)}</Text>
                  <Text fontWeight="bold" color="lightblue" fontSize="xl">
                    Items:
                  </Text>
                  {o.items.map((item, index) => (
                    <Item key={index} item={item} />
                  ))}
                  <Divider />
                  <Text fontSize="lg">Comment: {o.comment}</Text>
                  <Text fontSize="lg">Total: {o.orderPrice.toFixed(2)}$</Text>
                  {!o.approved && (
                    <>
                      <Button
                        colorScheme="green"
                        onClick={(e) => {
                          sellerApi.postApprove(o.id).then((res) => refresh());
                        }}
                      >
                        Approve
                      </Button>
                    </>
                  )}
                </VStack>
              </Popup>
            </Marker>
          </div>
        ))}
    </MapContainer>
  );
};

export default Map;
