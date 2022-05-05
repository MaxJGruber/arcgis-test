import { UiStoreProvider } from "stores/uiStore";
import { MapStoreProvider } from "stores/mapStore";
import { Box } from "@mui/material";
import AppLayout from "layouts/AppLayout";

const FullScreenAppLayout = ({ ...props }) => (
  <UiStoreProvider>
    <MapStoreProvider>
      <Box
        position="fixed"
        width={1}
        height={1}
        display="flex"
        flexDirection="column"
      >
        <AppLayout overflow="hidden" fluid={true} footer={false} {...props} />
      </Box>
    </MapStoreProvider>
  </UiStoreProvider>
);

export default FullScreenAppLayout;
