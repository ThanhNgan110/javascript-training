import StatesEntity from "./entity/state.entity";
export default class StatesModel {
  setStates = (states) => {
    this.states = states.map((states) => new StatesEntity(states));
  };

  getStates = () => {
    return this.states;
  };

  getStatesByCountry = (countryId) => {
    return this.states.filter((state) => state.countryId == countryId);
  };
}
