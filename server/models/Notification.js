import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  notification_title: String,
  jobId: String,
  readBy: [
    {
      email: {
        type: String,
      
      },
      isread: Boolean
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (value) {
      return value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
