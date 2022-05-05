import dynamic from "next/dynamic";
import SampleLayout from "layouts/SampleLayout";
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

Index.Layout = SampleLayout;
Index.layoutProps = () => ({ Drawer: <SampleDrawer /> });
export default Index;
