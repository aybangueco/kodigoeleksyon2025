
import { Separator } from '@/components/ui/separator';

/**
 * Component that displays election day reminders and tips
 */
const ElectionReminder: React.FC = () => {
  return (
    <div className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/20">
      <h3 className="font-medium mb-2">Remember for Election Day</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Make sure to prepare the following for a smooth voting experience:
      </p>
      <ul className="text-sm space-y-2">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Valid ID for verification</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Your precinct number and voting location information</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>This kodigo (printed or saved on your phone)</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          <span>Your own black/blue pen for a hygienic voting experience</span>
        </li>
      </ul>
      
      <Separator className="my-4" />
      
      <p className="text-sm text-center">
        Election day is an important opportunity to shape our nation's future.
        <br />
        Your vote matters!
      </p>
    </div>
  );
};

export default ElectionReminder;
