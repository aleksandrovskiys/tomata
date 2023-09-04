import { Pomidor } from "../interafaces";
import { PomidorListElement } from "./PomidorListElement";

interface Props {
  pomidors: Pomidor[];
}
export const PomidorList = ({ pomidors }: Props) => {
  return (
    <div>
      <ul>
        {pomidors.map((pomidor, idx) => (
          <PomidorListElement pomidor={pomidor} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default PomidorList;
