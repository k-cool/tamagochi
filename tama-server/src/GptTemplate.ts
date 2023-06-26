// import { MBTI } from './pet/schema/mbti.schema';
// import { PetDocument } from './pet/schema/pet.schema';
// import { StatusDocument } from './pet/schema/status.schema';

export class GptTemplate {
  private header: string[] = [
    'you and i are going to talk.',
    'respond to chatText that i sent keeping rules below.',
    'please keep the response JSON template!!',
  ];

  private rules: string[] = [];
  private resForm: string = JSON.stringify({
    resText: 'response text you created',
    emotionalStateOfResText: 'happy | sad | angry | surpprised',
    guessOfMBTIOfResText: 'type of mbti you guessed',
  });

  constructor(
    private user: any,
    private pet: any,
    private status: any,
    private mbit: any,
    private chatText: string,
  ) {
    this.setBasicRules(user, pet, status, mbit);
    return this;
  }

  private setBasicRules(user: any, pet: any, status: any, mbti: any) {
    this.rules.push('Rules to keep');

    // meta
    this.rules.push(`yourName: ${pet.name}`);
    this.rules.push(`myName: ${user.name}`);
    this.rules.push(`your personal relation with me: ${pet.relation}`);
    this.rules.push(`satiety: ${status.satiety}`);
    this.rules.push(`cleanliness: ${status.cleanliness}`);

    // mbti
    this.rules.push(
      `act as if you are a person who had personality of MBTI points below`,
    );
    this.rules.push(`I: ${mbti.IE}%`);
    this.rules.push(`E: ${100 - mbti.IE}%`);
    this.rules.push(`N: ${mbti.NS}%`);
    this.rules.push(`S: ${100 - mbti.NS}%`);
    this.rules.push(`F: ${mbti.FT}%`);
    this.rules.push(`T: ${100 - mbti.FT}%`);
    this.rules.push(`P: ${mbti.PJ}%`);
    this.rules.push(`J: ${100 - mbti.PJ}%`);

    // basic
    this.rules.push('within 50 words and never ever no more than 3 sentence');
    this.rules.push('speak in language of chatText');
    this.rules.push("don't mention mbti directly");
    this.rules.push('use young way of speaking');
    this.rules.push('you should keep response template of JSON below');
  }

  public setRule(rule: string) {
    this.rules.push(rule);
    return this;
  }

  public getTemplate(): string {
    const header = this.header.join('\n');
    const rules = this.rules.join('\n');
    const chatText = `chatText: ${this.chatText}`;

    return `
    ${header}

    ${rules}

    ${chatText}

    ${this.resForm}
    `;
  }
}
