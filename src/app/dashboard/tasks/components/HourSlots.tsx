import dayjs from "dayjs";
import { useMemo } from "react";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface Event {
  id: string;
  end: string;
  name: string;
  start: string;
}

interface Props {
  eventsForTheDay: Event[];
}

const HourSlots = ({ eventsForTheDay }: Props) => {
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 to 23 (24h)

  const renderedEvents = useMemo(() => {
    return eventsForTheDay.map((e) => {
      const start = dayjs(e.start);
      const end = dayjs(e.end);
      const durationInMinutes = end.diff(start, "minute");
      const topOffset = start.hour() * 64 + (start.minute() / 60) * 64;
      const height = (durationInMinutes / 60) * 64;

      return {
        ...e,
        topOffset,
        height,
        timeLabel: `${start.format("HH:mm")} - ${end.format("HH:mm")}`,
      };
    });
  }, [eventsForTheDay]);

  return (
    <div className="w-2/3 p-5 relative">
      {/* Time grid */}
      <div className="border border-infobg divide-y divide-infobg">
        {hours.map((hour) => (
          <div key={hour} className="h-16 relative px-4">
            <div className="absolute -left-[0.5px] -top-3 text-xs bg-infobg text-iconBlack px-2 py-1 w-14 text-left">
              {dayjs().hour(hour).minute(0).format("h A")}
            </div>
          </div>
        ))}
      </div>

      {/* Event blocks */}
      <div className="absolute top-[21px] left-[14%] w-full right-4">
        {renderedEvents.map((event) => (
          <div
            key={event.id}
            className="absolute bg-infobg z-20 text-iconBlack px-3 py-2 text-sm font-medium w-[83%]"
            style={{
              top: `${event.topOffset}px`,
              height: `${event.height}px`,
            }}
          >
            <div>{event.name}</div>
            <div className="text-xs text-green-100">{event.timeLabel}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourSlots;
