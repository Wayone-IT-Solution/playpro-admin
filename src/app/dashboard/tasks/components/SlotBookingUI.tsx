import { toast } from 'react-toastify';
import { FiCheck } from 'react-icons/fi';
import { Delete } from '@/hooks/apiUtils';
import { useEffect, useState } from 'react';
import { FaRegCalendarAlt, FaClock, FaTrashAlt } from 'react-icons/fa';

type Slot = {
    _id: number;
    date: string;
    isBooked: any;
    endTime: string;
    doctorId: number;
    duration: number;
    startTime: string;
    dayOfWeek: string;
    selected?: boolean;
};

const SlotBookingUI = ({ slots: newSlots, fetchGroundSlots, selectedDoctor }: { slots: Slot[], fetchGroundSlots: any; selectedDoctor: any }) => {
    const [slots, setSlots] = useState<Slot[]>([]);
    useEffect(() => {
        const initialSlots: Slot[] = newSlots.map(slot => ({ ...slot, selected: slot.isBooked ? true : false }));
        setSlots(initialSlots);
    }, [newSlots])

    const removeSlot = async (slotId: any) => {
        try {
            if (!selectedDoctor) return toast.warn("Please select ground!");
            const response: any = await Delete("/api/slot", { slot_id: slotId, groundId: selectedDoctor });
            if (response?.success) {
                await fetchGroundSlots();
            };
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    };

    function getWeekDay(date: string | Date): string {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date(date);
        return days[d.getDay()];
    }

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className='pt-4'>
            <h2 className="text-xl mb-4 font-bold text-gray-800">Available Slots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
                {slots.map(slot => (
                    <div
                        key={slot._id}
                        className={`p-2 border rounded-lg cursor-pointer transition-all duration-200 ${slot.selected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${slot.selected
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-800'
                                }`}>
                                {getWeekDay(slot.date)}
                            </span>
                            {!slot.selected &&
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSlot(slot._id);
                                    }}
                                    className="text-red-400 hover:text-red-500"
                                >
                                    <FaTrashAlt />
                                </button>
                            }
                        </div>

                        <div className="mt-3 text-xs space-y-2">
                            <div className="flex items-center text-gray-700">
                                <FaRegCalendarAlt className="mr-2 text-gray-500" />
                                <span>{formatDate(slot.date)}</span>
                            </div>

                            <div className="flex items-center text-gray-700">
                                <FaClock className="mr-2 text-gray-500" />
                                <span>
                                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </span>
                            </div>

                            <div className="text-xs text-gray-500">
                                {slot.duration} minute session
                            </div>

                            {slot.selected && (
                                <div className="flex items-center text-green-600 mt-2">
                                    <FiCheck className="mr-1" />
                                    <span className="text-xs">Selected</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlotBookingUI;