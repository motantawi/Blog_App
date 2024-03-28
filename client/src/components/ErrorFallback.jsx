import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useQueryErrorResetBoundary } from "react-query";

const ComponentErrorWrapper = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();
  const { pathname } = useLocation();

  return (
    <ErrorBoundary
      key={pathname}
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            textAlign: "center",
          }}
        >
          <ErrorOutlineIcon color="action" style={{ fontSize: 120 }} />
          <Typography color="textSecondary" variant="h4">
            حدث خطأ اثناء عرض البيانات
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 5, fontSize: "20px" }}
            onClick={() => resetErrorBoundary()}
          >
            إعادة المحاولة
          </Button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ComponentErrorWrapper;
