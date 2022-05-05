
import { UiStoreProvider } from "stores/uiStore";
import { MapStoreProvider } from "stores/mapStore";
import AppLayout from "layouts/AppLayout";

const SampleLayout = ({ children, Drawer, ...props }) => (
  <UiStoreProvider>
    <AppLayout Drawer={Drawer} {...props}>
      <MapStoreProvider>
        {children}
      </MapStoreProvider>
    </AppLayout>
  </UiStoreProvider>
);

export default SampleLayout;
