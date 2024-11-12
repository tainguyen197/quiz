import { Grid } from "@mui/material";
import { getProductsList } from "../../apis/getProductsList";
import ProductCard from "../../components/ProductCard";
import { useFetchingData } from "../../hooks/useFetchingData";

const ProductsList = () => {
  const { isLoading, error, data } = useFetchingData(
    "productList",
    getProductsList
  );
  if (!data) return <div>Cant fetch data</div>;

  return (
    <Grid container spacing={2}>
      {data?.map((item) => (
        <Grid item spacing={2}>
          <ProductCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
