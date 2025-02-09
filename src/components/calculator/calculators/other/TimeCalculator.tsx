import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TimeCalculator = () => {
  const [time1, setTime1] = useState({ hours: "", minutes: "", seconds: "" });
  const [time2, setTime2] = useState({ hours: "", minutes: "", seconds: "" });
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const normalizeTime = (time: {
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    let { hours, minutes, seconds } = time;

    // Convert excess seconds to minutes
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;

    // Convert excess minutes to hours
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    return { hours, minutes, seconds };
  };

  const timeToSeconds = (time: {
    hours: string;
    minutes: string;
    seconds: string;
  }) => {
    return (
      (parseInt(time.hours) || 0) * 3600 +
      (parseInt(time.minutes) || 0) * 60 +
      (parseInt(time.seconds) || 0)
    );
  };

  const secondsToTime = (totalSeconds: number) => {
    const absSeconds = Math.abs(totalSeconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const seconds = absSeconds % 60;

    return {
      hours: totalSeconds < 0 ? -hours : hours,
      minutes,
      seconds,
    };
  };

  const calculateTime = () => {
    const seconds1 = timeToSeconds(time1);
    const seconds2 = timeToSeconds(time2);

    let resultSeconds: number;
    if (operation === "+") {
      resultSeconds = seconds1 + seconds2;
    } else {
      resultSeconds = seconds1 - seconds2;
    }

    setResult(normalizeTime(secondsToTime(resultSeconds)));
  };

  const TimeInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: typeof time1;
    onChange: (value: typeof time1) => void;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Input
            type="number"
            placeholder="HH"
            value={value.hours}
            onChange={(e) => onChange({ ...value, hours: e.target.value })}
            min="0"
          />
        </div>
        <div>
          <Input
            type="number"
            placeholder="MM"
            value={value.minutes}
            onChange={(e) => onChange({ ...value, minutes: e.target.value })}
            min="0"
            max="59"
          />
        </div>
        <div>
          <Input
            type="number"
            placeholder="SS"
            value={value.seconds}
            onChange={(e) => onChange({ ...value, seconds: e.target.value })}
            min="0"
            max="59"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-6">Time Calculator</h2>

      <div className="space-y-6">
        <TimeInput label="First Time" value={time1} onChange={setTime1} />

        <div>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+">Add (+)</SelectItem>
              <SelectItem value="-">Subtract (-)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TimeInput label="Second Time" value={time2} onChange={setTime2} />

        <Button onClick={calculateTime} className="w-full">
          Calculate
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold">Result:</p>
            <p className="text-2xl font-mono mt-2">
              {Math.abs(result.hours).toString().padStart(2, "0")}:
              {result.minutes.toString().padStart(2, "0")}:
              {result.seconds.toString().padStart(2, "0")}
              {result.hours < 0 ? " (negative)" : ""}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
