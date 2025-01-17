import { userAtom } from "@/features/user/atoms/current-user-atom.ts";
import { updateUser } from "@/features/user/services/user-service.ts";
import { Group, MantineSize, Switch, Text } from "@mantine/core";
import { useAtom } from "jotai/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IUser } from "../types/user.types";

export default function PageWidthPref() {
  const { t } = useTranslation();

  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">{t("Full page width")}</Text>
        <Text size="sm" c="dimmed">
          {t("Choose your preferred page width.")}
        </Text>
      </div>

      <PageWidthToggle />
    </Group>
  );
}

interface PageWidthToggleProps {
  size?: MantineSize;
  label?: string;
}

const getPreferencesOptions = (fullPageWidth: boolean, viewHeadings: boolean): Partial<IUser> => {
  const obj: Partial<IUser> = {
    viewHeadings
  };
  if (fullPageWidth) {
    obj.viewHeadings = false;
  }
  obj.fullPageWidth = fullPageWidth;
  return obj;
}


export function PageWidthToggle({ size, label }: PageWidthToggleProps) {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
  const [checked, setChecked] = useState(
    user.settings?.preferences?.fullPageWidth,
  );

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked;
    console.log(value)
    const updatedUser = await updateUser(
      getPreferencesOptions(value, user?.settings?.preferences?.fullPageWidth ?? false)
    );
    setChecked(value);
    setUser(updatedUser);
  };

  return (
    <Switch
      size={size}
      label={label}
      labelPosition="left"
      defaultChecked={checked}
      onChange={handleChange}
      aria-label={t("Toggle full page width")}
    />
  );
}
