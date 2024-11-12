import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

interface ISubCardContent {
  color: string;
  score: string;
}

const SubCardContent = (props: ISubCardContent) => (
  <React.Fragment>
    <CardContent>
      <Typography color={props.color} component="p" gutterBottom>
        {props.score}
      </Typography>
      <Typography fontSize="12px" component="span" color={props.color}>
        Câu trả lời đúng
      </Typography>
    </CardContent>
  </React.Fragment>
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  border: "none",
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const MainResult = styled(Typography)(({ theme }) => ({
  fontSize: "45px !important",
  textAlign: "center",
  color: "#4caf50",
  fontWeight: 700,
}));

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainResult>
            <Typography>
              <ExpandCircleDownIcon />
            </Typography>
            100/110
          </MainResult>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper sx={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
            <StyledCard variant="outlined">
              <SubCardContent color="#4caf50" score="100" />
            </StyledCard>
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper>
            <StyledCard variant="outlined">
              <SubCardContent color="#ff9800" score="30" />
            </StyledCard>
          </StyledPaper>
        </Grid>

        <Grid item xs={6}>
          <StyledPaper>
            <StyledCard variant="outlined">
              <SubCardContent color="#ff5722" score="2" />
            </StyledCard>
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper>
            <StyledCard variant="outlined">
              <SubCardContent color="#03a9f4" score="30" />
            </StyledCard>
          </StyledPaper>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            sx={{ width: "75%", textAlign: "center", marginTop: "64px" }}
            variant="outlined"
          >
            Text
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Button
            sx={{ width: "75%", textAlign: "center", marginTop: "64px" }}
            variant="contained"
          >
            Text
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
