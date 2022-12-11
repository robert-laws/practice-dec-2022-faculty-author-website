import {
  Navigation,
  InputWithLabel,
  SingleTextInputWithButton,
  Heading,
} from '../components';

export const Home = () => {
  const handleSearchInput = (inputVal) => {
    console.log(inputVal);
  };

  return (
    <>
      <Navigation />
      <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <Heading size='2xlarge' text='Home' />
        <hr className='my-5' />

        <InputWithLabel
          labelProps={{
            label: 'Search Research Output',
            htmlForType: 'search',
          }}
          inputProps={{
            inputType: 'text',
            inputName: 'search',
            placeholder: 'Enter your search',
          }}
        />
        <hr className='my-5' />
        <SingleTextInputWithButton
          inputType='text'
          inputName='search'
          placeholder='Enter a Search'
          buttonText='Search'
          onButtonClick={handleSearchInput}
        />
      </div>
    </>
  );
};
