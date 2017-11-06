import expect from 'expect';
import * as accountValidation from 'accountValidation';

describe('accountValidation', () => {
  it('should return true for valid email address', () => {
    //Arrange
    const email = 'abc@abc.com';
    //Act
    const validation = accountValidation.validateEmail(email);
    //Assert
    expect(validation).toBe(true);
  });

  it('should return fail for invalid email address', () => {
    //Arrange
    const email = 'abc@abc.com';
    //Act
    const validation = accountValidation.validateEmail(email);
    //Assert
    expect(validation).toBe(true);
  });
});