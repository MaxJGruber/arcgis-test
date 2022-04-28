import dynamic from "next/dynamic";
import SampleLayout from "layouts/SampleLayout";
import SampleDrawer from "drawers/SampleDrawer";

const EsriMapWithNoSSR = dynamic(() => import("components/EsriMap"), {
  ssr: false,
});

const Index = () => <EsriMapWithNoSSR />;

Index.Layout = SampleLayout;
Index.layoutProps = () => ({ Drawer: <SampleDrawer /> });
export default Index;
