import { supabase } from "../../supabase";
import { useState, useEffect } from "react";

const RecentActivity = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const { data, error } = await supabase
          .from("inventory")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) {
          console.error(error);
        } else {
          setActivity(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchRecentActivity();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="recent-activity h-full">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="console">
          {activity.map((item) => (
            <div key={item.id} className="console-line">
              <span className="console-timestamp">
                {new Date(item.last_modified).toLocaleString()}
              </span>
              <span className="console-message">{`Item Added: ${item.lpn_number} - By: ${item.lastTouchedBy}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
