import PrimeVue from "../assets/primevue.svg";

export function ErrorComponent(): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-primary">
      <span className="font-bold bold">4</span>
      <div className="flex items-center justify-center bg-primary text-background-primary rounded-full w-32 h-32">
        <img src={PrimeVue} className="logo" alt="" />
      </div>
      <span className="font-bold bold">4</span>
    </div>
  );
}
