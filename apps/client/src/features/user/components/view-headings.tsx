import { userAtom } from "@/features/user/atoms/current-user-atom.ts";
import { updateUser } from "@/features/user/services/user-service.ts";
import { Group, MantineSize, Switch, Text } from "@mantine/core";
import { useAtom } from "jotai/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IUser } from "../types/user.types";

export default function ViewHeadingsPref() {
  const { t } = useTranslation();

  return (
    <Group justify="space-between" wrap="nowrap" gap="xl">
      <div>
        <Text size="md">{t("View headings")}</Text>
        <Text size="sm" c="dimmed">
          {t("Show article title menu.")}
        </Text>
      </div>

      <ViewHeadingsToggle />
    </Group>
  );
}

interface ViewHeadingsToggleProps {
  size?: MantineSize;
  label?: string;
}

const getPreferencesOptions = (viewHeadings: boolean): Partial<IUser> => {
  const obj: Partial<IUser> = {};
  if (viewHeadings) {
    obj.fullPageWidth = false;
  }
  obj.viewHeadings = viewHeadings;
  return obj;
}

export function ViewHeadingsToggle({ size, label }: ViewHeadingsToggleProps) {
  const { t } = useTranslation();
  const [user, setUser] = useAtom(userAtom);
  const [checked, setChecked] = useState(
    user.settings?.preferences?.viewHeadings,
  );

  console.log(checked)

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.checked;
    const updatedUser = await updateUser(getPreferencesOptions(value));
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
      aria-label={t("Toggle view headings menu")}
    />
  );
}