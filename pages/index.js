import dynamic from "next/dynamic";
import FullScreenAppLayout from "layouts/FullScreenAppLayout";
import SampleDrawer from "drawers/SampleDrawer";
import MapTooltip from "components/MapTooltip";

const EsriMapWithNoSSR = dynamic(() => import("components/EsriMap"), {
  ssr: false,
});

const Index = () => (
  <>
    <EsriMapWithNoSSR />
    <MapTooltip />
  </>
);

Index.Layout = FullScreenAppLayout;
Index.layoutProps = () => ({ Drawer: <SampleDrawer /> });
export default Index;
