import React from "react";
import tw from "twin.macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import ProductDescription from 'components/features/TwoColWithTwoHorizontalFeaturesAndButton.js'
import Hero from "components/hero/BackgroundAsImage.js";
import ContactUsForm from "components/forms/TwoColContactUsWithIllustration.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import FeatureWithSteps from "components/features/TwoColWithSteps.js";
import macHeroScreenshotImageSrc from "images/hero-screenshot-SB.png";

const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;
const HighlightedText = tw.span`text-primary-500`;

export default () => (
  <AnimationRevealPage>
    <Hero />
    {/* <MainFeature /> */}
    <FeatureWithSteps
        subheading={<Subheading>STEPS</Subheading>}
        heading={
          <>
            Easy to <HighlightedText>Get Started.</HighlightedText>
          </>
        }
        textOnLeft={false}
        imageSrc={macHeroScreenshotImageSrc}
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
      />
    <ProductDescription></ProductDescription>
   
    <Pricing />
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
