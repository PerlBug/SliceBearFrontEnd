import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import BeatLoader from "react-spinners/BeatLoader";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col lg:flex-row`
const Input = tw.input`border-2 px-5 py-3 rounded focus:outline-none font-medium transition duration-300 hocus:border-primary-500`

const SubmitButton = tw(PrimaryButtonBase)`inline-block lg:ml-6 mt-6 lg:mt-0`

export default ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "Want to get into contact with us, provide feedback or just send us a meme? Just send us a message and we'll get back to you as soon as possible.",
  submitButtonText = "Contact Us",
  formAction = "https://1qr35x0md5.execute-api.us-west-2.amazonaws.com/dev/users/contact-me/",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  const [email, setEmail] = useState(""); 
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const url = `${formAction}${email}`; 
    const response = await fetch(url); 
    const data = await response.json();
    
    if (data.accepted && data.accepted.length > 0) {
      setSubmissionStatus("success");
    } else {
      setSubmissionStatus("failure");
    } 
    setIsLoading(false);
    //console.log(data);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const renderSubmissionMessage = () => {
    if (submissionStatus === "success") {
      return <p tw="text-green-500 mt-4">Your email has been sent successfully!</p>;
    } else if (submissionStatus === "failure") {
      return <p tw="text-red-500 mt-4">Failed to send your email. Please try again.</p>;
    }
  };

  const renderLoader = () => {
    return (
      <div tw="mt-4">
        <BeatLoader color={"#3182CE"} loading={isLoading} css={css`display: block; margin: 0 auto;`} />
      </div>
    );
  };

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <Form onSubmit={handleSubmit}>
              <Input type="email" name="email" placeholder="Your Email Address" value={email} onChange={handleEmailChange} />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
            {isLoading && renderLoader()}
            {renderSubmissionMessage()}
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
