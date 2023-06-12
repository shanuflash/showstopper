import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from "@/styles/account.module.css";

const account = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("test", user);

  var avatarUrl = `https://ui-avatars.com/api/?name=${user?.user_metadata.name}&background=random&color=fff&rounded=true&size=150`;

  const handlePassChange = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const password = cookies().get("password")?.value;

    const { error } = await supabase.auth.updateUser({
      password: password,
    });
  };

  // const handleEmailChange = async (e) => {
  //   e.preventDefault();
  //   const { error } = await supabase.auth.updateUser({
  //     email: Email,
  //   });
  //   if (error) toast.error(error.message);
  //   else toast.info("Email updated successfully");
  // };

  return (
    <div>
      <div className={styles["user-data"]}>
        <div className={styles["user-data-item"]}>
          <div className={styles["user-data-left"]}>Personal Info</div>
          <div className={styles["user-data-right"]}>
            <div className={styles["user-img-container"]}>
              <img className={styles["user-img"]} src={avatarUrl} alt="" />
              Profile Picture
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>Name:</div>
              {user?.user_metadata.name}
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>Email:</div>
              {user?.email}
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>Phone:</div>
              {user?.user_metadata.phone}
            </div>
          </div>
        </div>
        <div className={styles["user-data-item"]}>
          <div className={styles["user-data-left"]}>Membership & Billing</div>
          <div className={styles["user-data-right"]}>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>Plan:</div>
              Premium HD (Yearly)
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>
                Billing Email:
              </div>
              {user?.email} (PayPal)
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>
                Next Billing:
              </div>
              April 18, 2024.
            </div>
          </div>
        </div>
        <div className={styles["user-data-item"]}>
          <div className={styles["user-data-left"]}>Security & Password</div>
          <div className={styles["user-data-right"]}>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>User ID:</div>
              {user?.id}
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>Last signin:</div>
              {Date(user?.last_sign_in_at)}
            </div>
            <div className={styles["user-info-item"]}>
              <div className={styles["user-info-item-title"]}>
                Change Password:
              </div>
              <form
                className={styles["password-reset"]}
                action={handlePassChange}
              >
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                />
                <button type="submit">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default account;
