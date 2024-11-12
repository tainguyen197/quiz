import { Alert, Box, Button } from "@mui/material";

export interface Answer {
  label: string;
  value: string;
}

type Props = {
  correctValue?: string;
  selectedValue?: string;
  defaultValue?: Answer;
  options: Array<string>;
  onChangeValue: (value: Answer) => void;
};

const SingleAnswer = ({
  options,
  correctValue,
  selectedValue,
  onChangeValue,
}: Props) => {
  if (!options) return <div>Can't found values</div>;

  const isCorrect = selectedValue && correctValue === selectedValue;
  const isWrong = selectedValue && correctValue !== selectedValue;

  return (
    <Box sx={{ maxWidth: "70%" }}>
      <Box>
        {Object.keys(options).map((key) => (
          <Button
            sx={{ justifyContent: "start" }}
            variant="text"
            onClick={() => onChangeValue({ label: options[key], value: key })}
          >
            {options[key]}
          </Button>
        ))}
      </Box>
      {isCorrect && (
        <Alert variant="outlined" severity="success">
          You got it!
        </Alert>
      )}
      {isWrong && (
        <Alert variant="outlined" severity="error">
          Opt, try again!
        </Alert>
      )}
    </Box>
  );
};

export default SingleAnswer;
