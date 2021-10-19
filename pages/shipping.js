import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Shipping() {
  const router = useRouter();
  const { dispatch, state } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    if (shippingAddress) {
      setValue("fullName", shippingAddress.fullName);
      setValue("address", shippingAddress.address);
      setValue("city", shippingAddress.city);
      setValue("postalCode", shippingAddress.postalCode);
      setValue("country", shippingAddress.country);
    }
  }, [router, userInfo, setValue, shippingAddress]);

  const classes = useStyles();
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push("/payment");
  };

  return (
    <>
      <Layout title="Shipping">
        <CheckoutWizard activeStep={1} />
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h1" variant="h1">
            Shipping Address
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="fullName"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    error={Boolean(errors.fullName)}
                    helperText={
                      errors.fullName
                        ? errors.fullName.type === "minLength"
                          ? "Full name is not long enough"
                          : "Full name is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    error={Boolean(errors.address)}
                    helperText={
                      errors.address
                        ? errors.address.type === "minLength"
                          ? "Address is not long enough"
                          : "Address is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="city"
                    label="City"
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === "minLength"
                          ? "City is not long enough"
                          : "City is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    error={Boolean(errors.postalCode)}
                    helperText={
                      errors.postalCode
                        ? errors.postalCode.type === "minLength"
                          ? "Postal Code is not long enough"
                          : "Postal Code is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="country"
                    label="Country"
                    error={Boolean(errors.country)}
                    helperText={
                      errors.country
                        ? errors.country.type === "minLength"
                          ? "Country is not long enough"
                          : "Country is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
          </List>
        </form>
      </Layout>
    </>
  );
}
