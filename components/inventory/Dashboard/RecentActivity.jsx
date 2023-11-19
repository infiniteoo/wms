import { supabase } from "../../../supabase";
import { useState, useEffect } from "react";

const RecentActivity = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const { data, error } = await supabase
          .from("inventory")
          .select("*")
          .order("last_modified", { ascending: true })
          .limit(5);

        if (error) {
          console.error(error);
        } else {
          setActivity(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="recent-activity">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="console">
          {activity.map((item) => (
            <div key={item.id} className="console-line">
              <span className="console-timestamp">
                {new Date(item.last_modified).toLocaleString()}
              </span>
              <span className="console-message">{`Updated Item: ${item.lpn_number} - By: ${item.lastTouchedBy}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
